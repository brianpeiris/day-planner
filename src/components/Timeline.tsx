import { createSignal, onMount, For, Show, Signal } from "solid-js";

import Block from "./Block";
import { formatTime, friendlyDuration } from "../utils/format";
import { IBlock, IBlocksSignal } from "../types";

import styles from "./Timeline.module.css";

const COLORS = [
  "hsl(0, 60%, 30%)",
  "hsl(60, 60%, 30%)",
  "hsl(120, 60%, 30%)",
  "hsl(180, 60%, 30%)",
  "hsl(240, 60%, 30%)",
  "hsl(300, 60%, 30%)",
];

let id = 0;

function Tick(props: { hour?: number; pos: number; class?: string }) {
  return (
    <div
      class={`${styles.tick} ${props.class ? props.class : ""}`}
      style={{
        left: `${props.pos}px`,
      }}
    >
      {props.hour}
    </div>
  );
}

function roundToQuarter(value: number) {
  return Math.round(value * 4) / 4;
}

function floorToQuarter(value: number) {
  return Math.floor(value * 4) / 4;
}

interface Props {
  endHour: number;
  blocks: IBlocksSignal;
  onDelete: () => void;
  onDuplicate: () => void;
}

export default function Timeline(props: Props) {
  let timelineElement: HTMLDivElement | undefined;
  let displayElement: HTMLDivElement | undefined;
  const [timelineWidth, setTimelineWidth] = createSignal(0);
  const [nowPos, setNowPos] = createSignal(0);
  const [nextTask, setNextTask] = createSignal<IBlock | undefined>();
  const [currentTask, setCurrentTask] = createSignal<IBlock | undefined>();
  const [time, setTime] = createSignal(0);
  const [showConfirmDelete, setShowConfirmDelete] = createSignal(false);
  const [startHour, setStartHour] = createSignal(0);
  const [isFullscreen, setIsFullscreen] = createSignal(false);
  const [blocks, setBlocks] = props.blocks;
  const numHours = () => props.endHour - startHour();
  const tickWidth = () => timelineWidth() / numHours();

  function updateTimelineWidth() {
    setTimelineWidth(timelineElement!.clientWidth);
    updateNowPos();
  }
  window.addEventListener("resize", updateTimelineWidth);
  onMount(updateTimelineWidth);

  function moveToTop(blockSignal: Signal<IBlock>) {
    setBlocks((blocks) => {
      const other = blocks.filter((other) => other !== blockSignal);
      return [...other, blockSignal];
    });
  }

  function updateBlock(
    blockSignal: Signal<IBlock>,
    pos: number,
    width: number,
  ) {
    const [block, setBlock] = blockSignal;
    setBlock({
      ...block(),
      start: roundToQuarter(pos / tickWidth() + startHour()),
      duration: roundToQuarter(width / tickWidth()),
    });
    updateNowPos();
  }

  function removeBlock(blockSignal: Signal<IBlock>) {
    setBlocks((blocks) => blocks.filter((block) => block !== blockSignal));
  }

  function cycleColor(blockSignal: Signal<IBlock>) {
    const [block, setBlock] = blockSignal;
    setBlock({
      ...block(),
      color: COLORS[(COLORS.indexOf(block().color) + 1) % COLORS.length],
    });
  }

  function renderBlockSignal(blockSignal: Signal<IBlock>) {
    const [block] = blockSignal;
    const pos = () => (block().start - startHour()) * tickWidth();
    const width = () => block().duration * tickWidth();
    return (
      <Block
        id={block().id}
        step={tickWidth() / 4}
        name={block().name}
        start={block().start}
        duration={block().duration}
        color={block().color}
        pos={pos()}
        width={width()}
        maxPos={timelineWidth() - width()}
        maxWidth={timelineWidth() - pos()}
        onStartChange={() => moveToTop(blockSignal)}
        onHover={() => moveToTop(blockSignal)}
        onChange={(pos, width) => updateBlock(blockSignal, pos, width)}
        onRemove={() => removeBlock(blockSignal)}
        onCycleColor={() => cycleColor(blockSignal)}
      />
    );
  }

  function getNextTask(time: number) {
    let nextTask: IBlock | undefined;
    for (const blockSignal of blocks()) {
      const [block] = blockSignal;
      if (
        block().start > time &&
        (!nextTask || block().start < nextTask.start)
      ) {
        nextTask = block();
      }
    }
    return nextTask;
  }

  function getCurrentTask(time: number) {
    for (const blockSignal of blocks()) {
      const [block] = blockSignal;
      if (block().start <= time && block().start + block().duration > time) {
        return block();
      }
    }
  }

  function updateNowPos() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = hours + minutes / 60 + seconds / 60 / 60;
    const nowPos =
      ((time - startHour()) / (24 - startHour())) * timelineWidth();
    setNowPos(nowPos);
    setTime(time);
    setNextTask(getNextTask(time));
    setCurrentTask(getCurrentTask(time));
  }
  setInterval(updateNowPos, 1000);

  function parseInput(input: string) {
    let [, name, durationStr] = input.trim().match(/(.+) ([0-9.]+)/i) || [];
    if (!name) {
      name = input.trim();
    }
    const duration = !durationStr?.trim()
      ? 1
      : durationStr === "15"
        ? 0.25
        : durationStr === "30"
          ? 0.5
          : parseFloat(durationStr);
    return [name, duration] as [string, number];
  }

  function addBlock(input: string | null, start: number) {
    if (!input) return;
    const [name, duration] = parseInput(input);
    const blockId = id++;
    const color = COLORS[blockId % COLORS.length];
    setBlocks((blocks) => [
      ...blocks,
      createSignal({
        id,
        name,
        start,
        duration,
        color,
      }),
    ]);
  }

  function addBlockWithPrompt(start = 0) {
    addBlock(prompt(), start);
  }

  function fullscreen() {
    displayElement!.requestFullscreen();
  }

  function toggleEarly() {
    setStartHour(startHour() === 0 ? 6 : 0);
    updateNowPos();
  }

  document.addEventListener("fullscreenchange", () => {
    setIsFullscreen(document.fullscreenElement === displayElement);
  });

  return (
    <div class={styles.timelineContainer}>
      <div ref={displayElement} class={isFullscreen() ? styles.fullscreen : ""}>
        <div
          ref={timelineElement}
          class={styles.timeline}
          onContextMenu={(e) => e.preventDefault()}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget && e.buttons === 2) {
              addBlockWithPrompt(
                floorToQuarter(
                  (e.offsetX / timelineWidth()) * (24 - startHour()) +
                    startHour(),
                ),
              );
            }
          }}
        >
          <Show when={timelineWidth() !== 0}>
            <For each={Array.from({ length: numHours() })}>
              {(_, i) => (
                <Tick hour={i() + startHour()} pos={i() * tickWidth()} />
              )}
            </For>
            <For each={blocks()}>{renderBlockSignal}</For>
            <Tick pos={nowPos()} class={styles.nowLine} />
          </Show>
        </div>
        <div class={styles.display}>
          <div>{formatTime(time(), { seconds: true })}</div>
          <div class={styles.currentTask}>{currentTask()?.name}</div>
          <div class={styles.nextTaskContainer}>
            <div>{nextTask()?.name}</div>
            <div>
              {nextTask()
                ? friendlyDuration(nextTask()!.start - time(), { full: true })
                : ""}
            </div>
          </div>
        </div>
      </div>

      <div class={styles.buttons}>
        <button onClick={fullscreen}>fullscreen</button>
        <button onClick={toggleEarly}>
          {startHour() === 0 ? "hide" : "show"} early
        </button>
        <button onClick={props.onDuplicate}>duplicate</button>
        {showConfirmDelete() ? (
          <>
            <button onClick={() => setShowConfirmDelete(false)}>cancel</button>
            <button onClick={props.onDelete}>confirm</button>
          </>
        ) : (
          <button onClick={() => setShowConfirmDelete(true)}>delete</button>
        )}
      </div>
    </div>
  );
}

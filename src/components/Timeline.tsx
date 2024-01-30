import { createSignal, onMount, For, Show, Signal } from "solid-js";

import Block from "./Block";
import { formatTime, friendlyDuration } from "../utils/format";
import { IBlock, IBlocksSignal } from "../types";

import styles from "./Timeline.module.css";

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
  startHour: number;
  endHour: number;
  blocks: IBlocksSignal;
  onDelete: () => void;
}

export default function Timeline(props: Props) {
  let timelineElement: HTMLDivElement | undefined;
  const [timelineWidth, setTimelineWidth] = createSignal(0);
  const [nowPos, setNowPos] = createSignal(0);
  const [nextTask, setNextTask] = createSignal<IBlock | undefined>();
  const [time, setTime] = createSignal(0);
  const [input, setInput] = createSignal("");
  const [blocks, setBlocks] = props.blocks;
  const numHours = () => props.endHour - props.startHour;
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
      start: roundToQuarter(pos / tickWidth()),
      duration: roundToQuarter(width / tickWidth()),
    });
    updateNowPos();
  }

  function removeBlock(blockSignal: Signal<IBlock>) {
    setBlocks((blocks) => blocks.filter((block) => block !== blockSignal));
  }

  function renderBlockSignal(blockSignal: Signal<IBlock>) {
    const [block] = blockSignal;
    const pos = () => block().start * tickWidth();
    const width = () => block().duration * tickWidth();
    return (
      <Block
        id={block().id}
        step={tickWidth() / 4}
        name={block().name}
        start={block().start}
        duration={block().duration}
        pos={pos()}
        width={width()}
        maxPos={timelineWidth() - width()}
        maxWidth={timelineWidth() - pos()}
        onStartChange={() => moveToTop(blockSignal)}
        onHover={() => moveToTop(blockSignal)}
        onChange={(pos, width) => updateBlock(blockSignal, pos, width)}
        onRemove={() => removeBlock(blockSignal)}
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

  function updateNowPos() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = hours + minutes / 60 + seconds / 60 / 60;
    const nowPos = (time / 24) * timelineWidth();
    setNowPos(nowPos);
    setTime(time);
    setNextTask(getNextTask(time));
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
    setBlocks((blocks) => [
      ...blocks,
      createSignal({
        id: id++,
        name,
        start,
        duration,
      }),
    ]);
  }

  function addBlockWithPrompt(start = 0) {
    addBlock(prompt(), start);
  }

  return (
    <div class={styles.timelineContainer}>
      <div
        ref={timelineElement}
        class={styles.timeline}
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget && e.buttons === 2) {
            addBlockWithPrompt(
              floorToQuarter((e.offsetX / timelineWidth()) * 24),
            );
          }
        }}
      >
        <Show when={timelineWidth() !== 0}>
          <For each={Array.from({ length: numHours() })}>
            {(_, i) => <Tick hour={i()} pos={i() * tickWidth()} />}
          </For>
          <For each={blocks()}>{renderBlockSignal}</For>
          <Tick pos={nowPos()} class={styles.nowLine} />
        </Show>
      </div>
      <div>{formatTime(time(), { seconds: true })}</div>
      <div>{nextTask()?.name}</div>
      <div>
        {nextTask()
          ? friendlyDuration(nextTask()!.start - time(), { full: true })
          : ""}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBlock(input(), 0);
          setInput("");
        }}
      >
        <input value={input()} onChange={(e) => setInput(e.target.value)} />
      </form>
    <button onClick={props.onDelete}>delete</button>
    </div>
  );
}

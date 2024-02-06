import { createSignal } from "solid-js";

import { formatTime, friendlyDuration } from "../utils/format";

import styles from "./Block.module.css";

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

interface Props {
  id: number;
  step: number;
  name: string;
  start: number;
  duration: number;
  color: string;
  pos: number;
  width: number;
  maxPos: number;
  maxWidth: number;
  onHover: () => void;
  onStartChange: () => void;
  onChange: (pos: number, width: number) => void;
  onRemove: () => void;
}

export default function Block(props: Props) {
  const [moving, setMoving] = createSignal(false);
  const [resizing, setResizing] = createSignal(false);
  const [moveStart, setMoveStart] = createSignal({
    startPos: 0,
    startX: 0,
  });
  const [resizeStart, setResizeStart] = createSignal({
    startWidth: 0,
    startX: 0,
  });

  function startMoving(e: PointerEvent) {
    setMoveStart({
      startPos: props.pos,
      startX: e.clientX,
    });
    setMoving(true);
    props.onStartChange();
  }

  function startResizing(e: PointerEvent) {
    e.stopPropagation();
    setResizeStart({
      startWidth: props.width,
      startX: e.clientX,
    });
    setResizing(true);
    props.onStartChange();
  }

  function change(e: PointerEvent) {
    if (moving()) {
      const { startPos, startX } = moveStart();
      const newPos = Math.min(
        props.maxPos,
        Math.max(0, startPos + e.clientX - startX),
      );
      props.onChange(roundToStep(newPos, props.step), props.width);
    } else if (resizing()) {
      const { startWidth, startX } = resizeStart();
      const newWidth = Math.min(
        props.maxWidth,
        Math.max(props.step, startWidth + e.clientX - startX),
      );
      props.onChange(props.pos, roundToStep(newWidth, props.step));
    }
  }

  function stopChanging() {
    setMoving(false);
    setResizing(false);
  }

  window.addEventListener("pointerup", stopChanging);
  window.addEventListener("pointermove", change);

  return (
    <div
      class={`${styles.block} ${moving() ? styles.moving : ""} ${
        resizing() ? styles.resizing : ""
      }`}
      style={{
        left: `${props.pos}px`,
        width: `${props.width}px`,
        "background-color": props.color,
      }}
      onPointerDown={startMoving}
      onPointerMove={props.onHover}
      onDblClick={props.onRemove}
    >
      <span class={styles.name}>{props.name}</span>
      {props.duration > 0.25 ? friendlyDuration(props.duration) : ""}
      <div
        class={styles.handleTarget}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div class={styles.handle} onPointerDown={startResizing}></div>
      </div>
      <span class={styles.time}>{formatTime(props.start)}</span>
    </div>
  );
}

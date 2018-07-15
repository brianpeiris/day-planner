/* global fabric */

import { formatDuration, snapTo15 } from "./utils.js";
import signals from "./signals.js";

export default class BlockGui {
  constructor(block, color, canvas, pixelsPerHour) {
    const offset = 10;
    const rect = new fabric.Rect({
      left: block.start * pixelsPerHour,
      top: offset + 35,
      originX: "left",
      originY: "top",
      width: block.duration * pixelsPerHour,
      height: 60,
      fill: color,
      hasRotatingPoint: false,
      lockSkewingY: true,
      lockMovementY: true,
      lockScalingFlip: true,
      transparentCorners: false,
      objectCaching: false
    });
    rect.setControlsVisibility({
      ml: false,
      mb: false,
      mt: false,
      tr: false,
      tl: false,
      bl: false,
      br: false
    });
    canvas.add(rect);

    const textDefaults = {
      fontSize: 12,
      fontFamily: "sans-serif",
      hasControls: false
    };

    const time = new fabric.Text("", {
      ...textDefaults,
      originX: "left",
      top: offset,
      angle: 60,
      textAlign: "center"
    });
    canvas.add(time);

    const duration = new fabric.Text("", {
      ...textDefaults,
      originX: "center",
      top: offset + 60,
      textAlign: "center"
    });
    canvas.add(duration);

    const label = new fabric.Text(block.label, {
      ...textDefaults,
      top: offset + 100,
      angle: 60
    });
    canvas.add(label);

    function updateText() {
      const start = rect.left + 12;
      const mid = rect.left + rect.getScaledWidth() / 2 - 2;
      duration.left = mid;
      label.left = start;
      time.left = start;
      time.text = `${Math.floor(block.start)}:${Math.round((block.start % 1) * 60) || "00"}`;
      duration.text = block.duration === 0.25 ? "" : formatDuration(block.duration);
    }
    updateText();

    function snapLeft() {
      const snappedLeft = snapTo15(pixelsPerHour, rect.left);
      block.start = Math.min(24 - block.duration, Math.max(0, snappedLeft));
      rect.left = block.start * pixelsPerHour;
    }
    rect.on("moving", snapLeft);
    rect.on("moving", updateText);
    rect.on("moved", signals.blockChanged.dispatch);

    function snapWidth() {
      const snappedWidth = snapTo15(pixelsPerHour, rect.getScaledWidth());
      block.duration = Math.min(24 - block.start, Math.max(0.25, snappedWidth));
      rect.scaleX = 1;
      rect.width = block.duration * pixelsPerHour;
    }
    rect.on("scaling", snapWidth);
    rect.on("scaling", updateText);
    rect.on("scaled", signals.blockChanged.dispatch);
    rect.on("mousedblclick", () => {
      signals.removeBlock.dispatch({ block });
    });
    rect.on("deselected", () => {
      signals.blockDeselected.dispatch({ block });
    });
    rect.on("selected", () => {
      signals.blockSelected.dispatch({ block });
    });
    signals.blockRemoved.add(({ block: _block }) => {
      if (_block !== block) return;
      canvas.remove(rect);
      canvas.remove(label);
      canvas.remove(time);
      canvas.remove(duration);
    });
  }
}

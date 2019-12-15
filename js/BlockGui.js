/* global fabric */
import { formatDuration, snapTo15, formatTime } from "./utils.js";
import signals from "./signals.js";

export default class BlockGui {
  constructor(block, canvas, pixelsPerHour) {
    this._block = block;
    this._pixelsPerHour = pixelsPerHour;
    const offset = 10;
    const rect = new fabric.Rect({
      left: block.start * pixelsPerHour,
      top: offset + 35,
      originX: "left",
      originY: "top",
      width: block.duration * pixelsPerHour,
      height: 60,
      fill: block.color,
      hasRotatingPoint: false,
      lockSkewingY: true,
      lockMovementY: true,
      lockScalingFlip: true,
      transparentCorners: false,
      objectCaching: false
    });
    this._rect = rect;
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

    this._time = new fabric.Text("", {
      ...textDefaults,
      originX: "left",
      top: offset,
      angle: 60,
      textAlign: "center"
    });
    canvas.add(this._time);

    this._duration = new fabric.Text("", {
      ...textDefaults,
      originX: "center",
      top: offset + 60,
      textAlign: "center"
    });
    canvas.add(this._duration);

    this._label = new fabric.Text(block.label, {
      ...textDefaults,
      top: offset + 100,
      angle: 60
    });
    canvas.add(this._label);

    this._updateText();

    function snapLeft() {
      const snappedLeft = snapTo15(this._pixelsPerHour, rect.left);
      block.start = Math.min(24 - block.duration, Math.max(0, snappedLeft));
      rect.left = block.start * this._pixelsPerHour;
    }
    rect.on("moving", snapLeft.bind(this));
    rect.on("moving", this._updateText.bind(this));
    rect.on("moved", signals.blockChanged.dispatch);

    function snapWidth() {
      const snappedWidth = snapTo15(this._pixelsPerHour, rect.getScaledWidth());
      block.duration = Math.min(24 - block.start, Math.max(0.25, snappedWidth));
      rect.scaleX = 1;
      rect.width = block.duration * this._pixelsPerHour;
    }
    rect.on("scaling", snapWidth.bind(this));
    rect.on("scaling", this._updateText.bind(this));
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
      canvas.remove(this._label);
      canvas.remove(this._time);
      canvas.remove(this._duration);
    });
  }
  _updateText() {
    const rect = this._rect;
    const start = rect.left + 12;
    const mid = rect.left + rect.getScaledWidth() / 2 - 2;
    const block = this._block;
    this._duration.left = mid;
    this._label.left = start;
    this._time.left = start;
    this._time.text = formatTime(block.start);
    this._duration.text = block.duration === 0.25 ? "" : formatDuration(block.duration);
  }
  resize(pixelsPerHour) {
    this._pixelsPerHour = pixelsPerHour;
    this._rect.left = this._block.start * pixelsPerHour;
    this._rect.scaleX = 1;
    this._rect.width = this._block.duration * pixelsPerHour;
    this._rect.setCoords();
    this._updateText();
  }
}

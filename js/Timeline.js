/* global fabric */

import { snapTo15 } from "./utils.js";
import BlockGui from "./BlockGui.js";
import signals from "./signals.js";

export default class Timeline {
  constructor(canvasEl) {
    const innerWidth = window.innerWidth;
    canvasEl.width = innerWidth;
    canvasEl.style.width = innerWidth + "px";

    this._canvas = new fabric.Canvas(canvasEl);
    this._canvas.selection = false;
    this._canvas.allowTouchScrolling = true;
    this._pixelsPerHour = innerWidth / 24;

    canvasEl.parentNode.addEventListener("click", e => {
      e.stopPropagation();
    });

    this._colors = [];
    const numColors = 10;
    for (let i = 0; i < numColors; i++) {
      this._colors.push(`hsla(${(i / numColors) * 255}, 100%, 50%, 50%)`);
    }
    this._colors.sort(() => {
      return Math.random() - 0.5;
    });
    this._colorCounter = 0;

    const height = 180;
    for (let i = 0; i < 24; i++) {
      this._canvas.add(
        new fabric.Line([i * this._pixelsPerHour, 0, i * this._pixelsPerHour, height], {
          evented: false,
          selectable: false,
          stroke: "#ffaaaa",
          strokeWidth: 1
        })
      );
      this._canvas.add(
        new fabric.Text(i.toString(), {
          evented: false,
          selectable: false,
          fontFamily: "sans-serif",
          fontSize: 12,
          top: height - 12,
          originX: "left",
          left: i * this._pixelsPerHour + 2
        })
      );
    }

    this._now = new fabric.Line([0, 20, 0, 130], {
      stroke: "blue",
      strokeWidth: 1
    });
    this._canvas.add(this._now);
    this._canvas.on("mouse:dblclick", e => {
      if (e.target !== null) return;
      signals.newBlock.dispatch({
        start: snapTo15(this._pixelsPerHour, e.pointer.x)
      });
    });
  }

  setNow(hour) {
    this._now.left = Math.floor(hour * this._pixelsPerHour);
  }

  add(block) {
    new BlockGui(block, this._getNextColor(), this._canvas, this._pixelsPerHour);
  }

  render() {
    this._canvas.requestRenderAll();
  }

  _getNextColor() {
    return this._colors[++this._colorCounter % this._colors.length];
  }

  deselect() {
    this._canvas.discardActiveObject();
    this.render();
  }
}

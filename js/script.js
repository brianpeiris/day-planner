import "fabric";
import React from "react";
import ReactDOM from "react-dom";

import TimelineGui from "./TimelineGui.js";
import { formatDuration, last, parseDuration, fromJSON, formatTime } from "./utils.js";
import signals from "./signals.js";

class Block {
  constructor(label, start = 0, duration = 1, color) {
    this.label = label;
    this.start = start;
    this.duration = duration;
    this.color = color;
  }
  serialize() {
    return {
      label: this.label,
      start: this.start,
      duration: this.duration
    };
  }
}

const buttonModes = {
  add: "add",
  delete: "delete"
};

const ticks = Array.from({ length: 24 }).map((_, i) => (
  <span key={i} style={{ top: `${i * 60}px` }} className="tick">
    {i}
  </span>
));

const colors = [];
const numColors = 10;
for (let i = 0; i < numColors; i++) {
  colors.push(`hsla(${(i / numColors) * 255}, 100%, 50%, 50%)`);
}
colors.sort(() => Math.random() - 0.5);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      hour: 0,
      buttonMode: buttonModes.add
    };

    const urlBlocks = new URLSearchParams(location.search).get("blocks");
    this.blocks = [];
    if (urlBlocks) {
      this.blocks = JSON.parse(atob(urlBlocks)).map(fromJSON.bind(null, Block));
    }
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].color = colors[i % numColors];
    }
    this.blocks.sort((a, b) => a.start - b.start);

    this.timelineGui = new TimelineGui(window.timeline);

    for (const block of this.blocks) {
      this.timelineGui.add(block);
    }

    document.body.addEventListener("click", () => {
      this.timelineGui.deselect();
    });

    setInterval(() => {
      const hour = (new Date() - new Date(new Date().toDateString())) / 1000 / 60 / 60;
      this.setState({ hour });
    }, 100);

    signals.newBlock.add(this.promptAndAddBlock.bind(this));

    window.addEventListener("resize", this.timelineGui.resize.bind(this.timelineGui));

    signals.blockChanged.add(this.updateUrl.bind(this));
    signals.removeBlock.add(({ block }) => {
      this.blocks.splice(this.blocks.indexOf(block), 1);
      signals.blockRemoved.dispatch({ block });
      this.updateUrl();
    });
    signals.blockDeselected.add(() => {
      this.selectedBlock = null;
      this.setState({ buttonMode: buttonModes.add });
    });
    signals.blockSelected.add(({ block }) => {
      this.selectedBlock = block;
      this.setState({ buttonMode: buttonModes.delete });
    });
  }

  doAction = e => {
    e.stopPropagation();
    if (this.state.buttonMode === buttonModes.add) {
      signals.newBlock.dispatch({});
    } else if (this.state.buttonMode === buttonModes.delete) {
      if (!this.selectedBlock) return;
      signals.removeBlock.dispatch({ block: this.selectedBlock });
    } else {
      throw new Error(`Invalid button mode "${this.state.buttonMode}"`);
    }
  };

  updateUrl() {
    const asciiBlocks = btoa(JSON.stringify(this.blocks.map(block => block.serialize())));
    history.replaceState(null, null, "?" + new URLSearchParams({ blocks: asciiBlocks }));
  }

  promptAndAddBlock({ start }) {
    const input = prompt("Name and duration:");
    if (!input || !input.trim()) return;

    const parts = input.split(" ");
    const duration = parseDuration(last(parts));
    const label = duration ? parts.slice(0, -1).join(" ") : input;

    const block = new Block(label, start, duration || 1, colors[this.blocks.length % numColors]);

    this.blocks.push(block);
    this.updateUrl();

    this.timelineGui.add(block);
  }

  render() {
    const { hour } = this.state;

    const sorted = this.blocks.slice(0).sort((a, b) => a.start - b.start);
    const current = sorted
      .slice(0)
      .reverse()
      .find(block => block.start <= hour && hour < block.start + block.duration);
    const next = sorted.find(block => block.start > hour);

    const wide = matchMedia("(min-width: 900px)").matches;
    this.timelineGui.visible(wide);
    if (wide) {
      this.timelineGui.setNow(hour);
      this.timelineGui.render();
    }

    const adjust = val => val * 60;

    return (
      <>
        <div className="info">
          {wide && (
            <button
              id="actionButton"
              onClick={this.doAction}
              className="mdl-button mdl-button--fab mdl-button--colored"
            >
              <i className="material-icons" id="actionButtonIcon">
                {this.state.buttonMode}
              </i>
            </button>
          )}
          <span id="time">{new Date().toTimeString().split(" ")[0]}</span>
          <span id="currentBlock">{current && current.label}</span>
          <div className="next">
            <span id="nextBlock">{next && next.label}</span>
            <span id="timeToNextBlock">{next && formatDuration(next.start - hour)}</span>
          </div>
        </div>
        {!wide && (
          <div id="verticalTimeline">
            {ticks}
            {this.blocks.map((block, i) => (
              <div
                key={i}
                className="block"
                style={{
                  top: `${adjust(block.start)}px`,
                  height: `${adjust(block.duration)}px`,
                  backgroundColor: block.color
                }}
              >
                <div className="blockInfo">
                  <span className="time">{formatTime(block.start)}</span>
                  <span className="label">{block.label}</span>
                  <span className="duration">{formatDuration(block.duration)}</span>
                </div>
              </div>
            ))}
            <div className="now" style={{ top: `${adjust(hour)}px` }} />
          </div>
        )}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

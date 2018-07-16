import Timeline from "./Timeline.js";
import { formatDuration, last } from "./utils.js";
import signals from "./signals.js";

class Block {
  constructor(label, start = 0, duration = 1) {
    this.label = label;
    this.start = start;
    this.duration = duration;
  }
}

function fromJSON(klass, jobj) {
  const obj = new klass();
  for (const key in jobj) {
    if (!jobj.hasOwnProperty(key)) continue;
    obj[key] = jobj[key];
  }
  return obj;
}

const minutes = {
  "15": 0.25,
  "30": 0.5,
  "45": 0.75
};
function parseDuration(str) {
  const parts = str.match(/((\d+)h)?((\d+)m?)?/);
  let hour = parts[2] ? parseInt(parts[2], 10) : 0;
  let min = parts[4] ? minutes[parts[4]] : 0;
  if (!hour && !min) {
    hour = parseInt(parts[4], 10);
    min = 0;
  }
  return hour + min || null;
}

const buttonModes = {
  add: "add",
  delete: "delete"
};

class App {
  constructor() {
    const urlBlocks = new URLSearchParams(location.search).get("blocks");
    this.blocks = [];
    if (urlBlocks) {
      this.blocks = JSON.parse(atob(urlBlocks)).map(fromJSON.bind(null, Block));
    }
    this.blocks.sort((a, b) => a.start - b.start);
    window.blocks = this.blocks;

    this.timeline = new Timeline(window.timeline);

    for (const block of this.blocks) {
      this.timeline.add(block);
    }

    document.body.addEventListener("click", () => {
      this.timeline.deselect();
    });

    this.updateInfo();
    setInterval(this.updateInfo.bind(this), 500);

    signals.newBlock.add(this.promptAndAddBlock.bind(this));

    this.buttonMode = buttonModes.add;
    window.actionButton.addEventListener("click", this.doAction.bind(this));

    window.addEventListener("resize", this.timeline.resize.bind(this.timeline));

    signals.blockChanged.add(this.updateUrl.bind(this));
    signals.removeBlock.add(({ block }) => {
      this.blocks.splice(this.blocks.indexOf(block), 1);
      signals.blockRemoved.dispatch({ block });
    });
    signals.blockDeselected.add(() => {
      this.selectedBlock = null;
      this.buttonMode = buttonModes.add;
      window.actionButtonIcon.textContent = this.buttonMode;
    });
    signals.blockSelected.add(({ block }) => {
      this.selectedBlock = block;
      this.buttonMode = buttonModes.delete;
      window.actionButtonIcon.textContent = this.buttonMode;
    });
  }

  doAction(e) {
    e.stopPropagation();
    if (this.buttonMode === buttonModes.add) {
      signals.newBlock.dispatch({});
    } else if (this.buttonMode === buttonModes.delete) {
      if (!this.selectedBlock) return;
      signals.removeBlock.dispatch({ block: this.selectedBlock });
    } else {
      throw new Error(`Invalid button mode "${this.buttonMode}"`);
    }
  }

  updateUrl() {
    history.replaceState(null, null, "?" + new URLSearchParams({ blocks: btoa(JSON.stringify(this.blocks)) }));
  }

  promptAndAddBlock({ start }) {
    const input = prompt("Name and duration:");
    if (!input || !input.trim()) return;

    const parts = input.split(" ");
    const duration = parseDuration(last(parts));
    const label = duration ? parts.slice(0, -1).join(" ") : input;

    const block = new Block(label, start, duration || 1);

    this.blocks.push(block);
    this.updateUrl();

    this.timeline.add(block);
  }

  updateInfo() {
    const hour = (new Date() - new Date(new Date().toDateString())) / 1000 / 60 / 60;
    this.timeline.setNow(hour);

    window.time.textContent = new Date().toTimeString().split(" ")[0];

    const sorted = this.blocks.slice(0).sort((a, b) => a.start - b.start);

    const next = sorted.find(block => block.start > hour);
    if (next) {
      window.nextBlock.textContent = next.label;
      window.timeToNextBlock.textContent = formatDuration(next.start - hour);
    }

    const current = sorted.reverse().find(block => block.start <= hour && hour < block.start + block.duration);
    window.currentBlock.textContent = current && current.label;

    this.timeline.render();
  }
}

window.app = new App();

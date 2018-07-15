import Timeline from "./Timeline.js";
import { formatDuration } from "./utils.js";
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

function last(arr) {
  if (!arr) return null;
  return arr[arr.length - 1];
}

class App {
  constructor() {
    const urlBlocks = new URLSearchParams(location.search).get("blocks");
    // let blocks = [{"label":"work","start":7.5,"duration":8},{"label":"eat","start":7,"duration":0.25},{"label":"commute","start":7.25,"duration":0.25},{"label":"shower","start":6.5,"duration":0.5},{"label":"exercise","start":6,"duration":0.5},{"label":"sleep","start":0,"duration":6},{"label":"kci","start":16,"duration":2},{"label":"to kci","start":15.5,"duration":0.5},{"label":"from kci","start":18,"duration":0.5},{"label":"eat","start":12,"duration":0.5},{"label":"relax","start":18.5,"duration":1.75},{"label":"sleep","start":21.5,"duration":2.5},{"label":"read","start":20.5,"duration":1},{"label":"eat","start":20.25,"duration":0.25}];
    //let blocks = [new Block('sleep', 22, 0.25), new Block('eat', 22.25, 0.25), new Block('eat', 2.5, 3.25)];
    this.blocks = [];
    if (urlBlocks) {
      this.blocks = JSON.parse(atob(urlBlocks)).map(fromJSON.bind(null, Block));
    }
    this.blocks.sort((a, b) => a.start - b.start);
    window.blocks = this.blocks;

    function updateUrl() {
      history.replaceState(null, null, "?" + new URLSearchParams({ blocks: btoa(JSON.stringify(this.blocks)) }));
    }

    const canvasEl = document.getElementById("timeline");
    this.timeline = new Timeline(canvasEl);

    for (const block of this.blocks) {
      this.timeline.add(block);
    }

    //let mousePos = 13.2 / 24 * window.innerWidth;
    //document.body.addEventListener('mousemove', (e) => {mousePos = e.clientX});

    this.updateInfo();
    setInterval(this.updateInfo.bind(this), 500);

    signals.newBlock.add(e => {
      const input = prompt("Name and duration:");
      if (!input || !input.trim()) return;

      const parts = input.split(" ");
      const duration = parseDuration(last(parts));
      const label = duration ? parts.slice(0, -1).join(" ") : input;

      const block = new Block(label, e.detail.start, duration || 1);

      this.blocks.push(block);
      updateUrl();

      this.timeline.add(block);
    });

    signals.blockChanged.add(updateUrl);
    signals.blockRemoved.add(block => {
      this.blocks.splice(this.blocks.indexOf(block), 1);
    });
  }

  updateInfo() {
    //const hour = 2.5;
    //const hour = mousePos / window.innerWidth * 24 //(new Date() - new Date(new Date().toDateString())) / 1000/60/60;
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

new App();

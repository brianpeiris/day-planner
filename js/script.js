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

class App {
  constructor() {
    const urlBlocks = new URLSearchParams(location.search).get("blocks");
    // let blocks = [{"label":"work","start":7.5,"duration":8},{"label":"eat","start":7,"duration":0.25},{"label":"commute","start":7.25,"duration":0.25},{"label":"shower","start":6.5,"duration":0.5},{"label":"exercise","start":6,"duration":0.5},{"label":"sleep","start":0,"duration":6},{"label":"kci","start":16,"duration":2},{"label":"to kci","start":15.5,"duration":0.5},{"label":"from kci","start":18,"duration":0.5},{"label":"eat","start":12,"duration":0.5},{"label":"relax","start":18.5,"duration":1.75},{"label":"sleep","start":21.5,"duration":2.5},{"label":"read","start":20.5,"duration":1},{"label":"eat","start":20.25,"duration":0.25}];
    //let blocks = [new Block('sleep', 22, 0.25), new Block('eat', 22.25, 0.25), new Block('eat', 2.5, 3.25)];
    let blocks = [];
    if (urlBlocks) {
      blocks = JSON.parse(atob(urlBlocks)).map(fromJSON.bind(null, Block));
    }
    blocks.sort((a, b) => a.start - b.start);
    window.blocks = blocks;

    function updateUrl() {
      history.replaceState(null, null, "?" + new URLSearchParams({ blocks: btoa(JSON.stringify(blocks)) }));
    }

    const canvasEl = document.getElementById("timeline");

    const timeline = new Timeline(canvasEl);

    for (const block of blocks) {
      timeline.add(block);
    }

    //let mousePos = 13.2 / 24 * window.innerWidth;
    //document.body.addEventListener('mousemove', (e) => {mousePos = e.clientX});
    function updateInfo() {
      const hour = 2.5;
      //const hour = mousePos / window.innerWidth * 24 //(new Date() - new Date(new Date().toDateString())) / 1000/60/60;
      //const hour = (new Date() - new Date(new Date().toDateString())) / 1000 / 60 / 60;
      timeline.setNow(hour);

      window.time.textContent = new Date().toTimeString().split(" ")[0];

      const sorted = blocks.slice(0).sort((a, b) => a.start - b.start);

      const next = sorted.find(block => block.start > hour);
      if (next) {
        window.nextBlock.textContent = next.label;
        window.timeToNextBlock.textContent = formatDuration(next.start - hour);
      }

      const current = sorted.reverse().find(block => block.start <= hour && hour < block.start + block.duration);
      window.currentBlock.textContent = current && current.label;

      timeline.render();
    }
    updateInfo();
    setInterval(updateInfo, 500);

    signals.newBlock.add(() => {
      const label = prompt();
      if (!label || !label.trim()) return;
      const block = new Block(label);
      blocks.push(block);
      updateUrl();
      timeline.add(block);
    });

    signals.blockChanged.add(updateUrl);
    signals.blockRemoved.add(block => {
      blocks.splice(blocks.indexOf(block), 1);
    });
  }
}

new App();

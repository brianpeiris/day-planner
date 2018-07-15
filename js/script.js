/* global fabric */
import BlockGui from "./BlockGui.js";
import { formatDuration } from "./utils.js";
import signals from "./signals.js";

class Block {
  constructor(label, start=0, duration=1) {
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
    const urlBlocks = new URLSearchParams(location.search).get('blocks');
    // let blocks = [{"label":"work","start":7.5,"duration":8},{"label":"eat","start":7,"duration":0.25},{"label":"commute","start":7.25,"duration":0.25},{"label":"shower","start":6.5,"duration":0.5},{"label":"exercise","start":6,"duration":0.5},{"label":"sleep","start":0,"duration":6},{"label":"kci","start":16,"duration":2},{"label":"to kci","start":15.5,"duration":0.5},{"label":"from kci","start":18,"duration":0.5},{"label":"eat","start":12,"duration":0.5},{"label":"relax","start":18.5,"duration":1.75},{"label":"sleep","start":21.5,"duration":2.5},{"label":"read","start":20.5,"duration":1},{"label":"eat","start":20.25,"duration":0.25}];
    //let blocks = [new Block('sleep', 22, 0.25), new Block('eat', 22.25, 0.25), new Block('eat', 2.5, 3.25)];
    let blocks = [];
    if (urlBlocks) {
      blocks = (JSON.parse(atob(urlBlocks))).map(fromJSON.bind(null, Block));
    }
    blocks.sort((a, b) => a.start - b.start);

    function updateUrl() {
      history.replaceState(null, null, '?' + new URLSearchParams({ blocks: btoa(JSON.stringify(blocks))}));
    }

    const c = document.getElementById('c');
    const innerWidth = window.innerWidth;
    c.width = innerWidth;
    c.style.width = innerWidth + 'px';
    var canvas = (this.__canvas = new fabric.Canvas("c"));
    canvas.selection = false;
    canvas.allowTouchScrolling = true;
    const pixelsPerHour = innerWidth / 24;

    this._colors = [];
    const numColors = 10;
    for (var i = 0; i < numColors; i++) {
      this._colors.push(`hsla(${i / numColors * 255}, 100%, 50%, 50%)`);
    }
    this._colors.sort((a, b) => {return Math.random() - 0.5});
    this._colorCounter = 0;

    const height = 180;
    for (var i = 0; i < 24; i++){
      canvas.add(new fabric.Line([i * pixelsPerHour, 0, i * pixelsPerHour, height], {evented: false, selectable: false, stroke: '#ffaaaa', strokeWidth: 1}))   
      canvas.add(new fabric.Text(i.toString(), {evented: false, selectable: false, fontFamily: 'sans-serif', fontSize: 12, top: height - 12, originX: 'left', left: i * pixelsPerHour + 2}))   
    }

    for (const block of blocks) {
      new BlockGui(block, this._getNextColor(), canvas, pixelsPerHour);
    }

    var now = new fabric.Line([0, 20, 0, 130], {stroke: 'blue', strokeWidth: 1});
    canvas.add(now);
    
    //let mousePos = 13.2 / 24 * window.innerWidth;
    //document.body.addEventListener('mousemove', (e) => {mousePos = e.clientX});
    function updateInfo() {
      //const hour = 14;
      //const hour = mousePos / window.innerWidth * 24 //(new Date() - new Date(new Date().toDateString())) / 1000/60/60;
      const hour =(new Date() - new Date(new Date().toDateString())) / 1000/60/60;
      now.left = Math.floor(hour * pixelsPerHour); 
      window.time.textContent = new Date().toTimeString().split(' ')[0];
      const cblocks = blocks.filter(block => block.start <= hour && hour < block.start + block.duration);
      const block = cblocks[cblocks.length - 1];
      window.currentBlock.textContent = block && block.label;
      let nextIndex = 0;
      let next;
      do {
        nextIndex++;
       next = blocks[blocks.indexOf(block) + nextIndex];
      } while(next && hour > next.start + next.duration);
      if (next) {
        window.nextBlock.textContent = next.label;
        window.timeToNextBlock.textContent = formatDuration(next.start - hour);
      }
      canvas.requestRenderAll();
    }
    updateInfo();
    setInterval(updateInfo, 500); 

    canvas.on("mouse:dblclick", (e) => {
      if (e.target !== null) return;
      const label = prompt();
      if (!label || !label.trim()) return;
      const block = new Block(label);
      blocks.push(block);
      updateUrl();
      new BlockGui(block, this._getNextColor(), canvas, pixelsPerHour);
    });
    
    signals.blockChanged.add(updateUrl);
    signals.blockRemoved.add(block => {
      blocks.splice(blocks.indexOf(block), 1);
    });
  }
  _getNextColor() {
    return this._colors[++this._colorCounter % this._colors.length];
  }
}

new App();
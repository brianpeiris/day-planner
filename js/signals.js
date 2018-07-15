class Signal extends EventTarget {
  constructor() {
    super();
    this.dispatch = detail => {
      this.dispatchEvent(new CustomEvent("signal", { detail }));
    };
  }

  add(func) {
    this.addEventListener("signal", e => func(e.detail));
  }
}

export default {
  blockChanged: new Signal(),
  blockRemoved: new Signal(),
  blockSelected: new Signal(),
  blockDeselected: new Signal(),
  removeBlock: new Signal(),
  newBlock: new Signal()
};

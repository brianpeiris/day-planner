class Signal extends EventTarget {
  constructor() {
    super();
    this.dispatch = detail => {
      this.dispatchEvent(new CustomEvent("signal", { detail }));
    };
  }

  add(func) {
    this.addEventListener("signal", func);
  }
}

export default {
  blockChanged: new Signal(),
  blockRemoved: new Signal(),
  newBlock: new Signal()
};

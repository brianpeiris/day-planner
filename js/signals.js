class Signal extends EventTarget {
  constructor() {
    super();
    this.dispatch = () => {
      this.dispatchEvent(new CustomEvent("signal"));
    };
  }
  add(func) {
    this.addEventListener("signal", func);
  }
}

export default {
  blockChanged: new Signal(),
  blockRemoved: new Signal()
};
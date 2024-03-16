import { createEffect, createSignal, For } from "solid-js";
import debounce from "lodash.debounce";

import Timeline from "./components/Timeline";
import { IBlock, IBlockSignals, IBlocksSignal } from "./types";

import "./App.css";

interface ITimeline {
  blocks: IBlocksSignal;
}

interface IJsonTimeline {
  blocks: IBlock[];
}

function createBlockSignals(blocks: IBlock[]): IBlockSignals {
  return blocks.map((block) => createSignal(block));
}

function createTimeline(blocks: IBlock[]): ITimeline {
  return {
    blocks: createSignal(createBlockSignals(blocks)),
  };
}

function getInitialTimelines(): ITimeline[] {
  const urlParams = new URLSearchParams(window.location.search);
  const timelines = urlParams.get("timelines");
  if (timelines) {
    const timelinesJson = JSON.parse(atob(timelines)) as IJsonTimeline[];
    return timelinesJson.map((jsonTimeline) =>
      createTimeline(jsonTimeline.blocks),
    );
  }
  return [createTimeline([])];
}

function getJSON(timelines: ITimeline[]) {
  const jsonTimelines = timelines.map((timeline) => {
    const [blockSignals] = timeline.blocks;
    const blocks = blockSignals().map(([block]) => block());
    return { blocks } as IJsonTimeline;
  });
  return JSON.stringify(jsonTimelines);
}

const debouncedUpdateUrl = debounce((encodedTimelines: string) => {
  history.replaceState({}, "", `?timelines=${encodedTimelines}`);
}, 100);

function App() {
  const initialTimelines = getInitialTimelines();

  const [timelines, setTimelines] = createSignal(initialTimelines);

  function addTimeline() {
    setTimelines([...timelines(), createTimeline([])]);
  }

  function deleteTimeline(timeline: ITimeline) {
    setTimelines(timelines().filter((other) => other !== timeline));
  }

  function duplicateTimeline(timeline: ITimeline) {
    const [blocks] = timeline.blocks;
    const blocksCopy = blocks().map(([block]) => ({ ...block() }));
    const newTimeline = createTimeline(blocksCopy);
    setTimelines([...timelines(), newTimeline]);
  }

  createEffect(() => {
    const encodedTimelines = encodeURIComponent(btoa(getJSON(timelines())));
    debouncedUpdateUrl(encodedTimelines);
  });

  return (
    <>
      <button onClick={addTimeline}>add timeline</button>
      <For each={timelines()}>
        {(timeline) => (
          <Timeline
            startHour={0}
            endHour={24}
            blocks={timeline.blocks}
            onDelete={() => deleteTimeline(timeline)}
            onDuplicate={() => duplicateTimeline(timeline)}
          />
        )}
      </For>
    </>
  );
}

export default App;

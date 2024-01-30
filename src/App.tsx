import { createEffect, createSignal, For } from "solid-js";

import Timeline from "./components/Timeline";
import { IBlockSignals, IBlocksSignal } from "./types";

import "./App.css";

interface ITimeline {
  blocks: IBlocksSignal;
}

function App() {
  const initialTimelines = (() => {
    const urlParams = new URLSearchParams(window.location.search);
    const timelines = urlParams.get("timelines");
    if (timelines) {
      return JSON.parse(atob(timelines)).map((timeline: any) => ({
        blocks: createSignal<IBlockSignals>(
          timeline.blocks.map((block: any) => {
            return createSignal({
              id: block.id,
              name: block.name,
              start: block.start,
              duration: block.duration,
            });
          }),
        ),
      }));
    }
    return [];
  })();

  const [timelines, setTimelines] = createSignal<ITimeline[]>(initialTimelines);

  function addTimeline() {
    setTimelines([...timelines(), { blocks: createSignal<IBlockSignals>([]) }]);
  }

  function getJSON() {
    return JSON.stringify(
      timelines().map((timeline) => {
        const [blocks] = timeline.blocks;
        return {
          blocks: blocks().map(([block]) => block()),
        };
      }),
    );
  }

  function deleteTimeline(timeline: ITimeline) {
    setTimelines(timelines().filter((other) => other !== timeline));
  }

  createEffect(() => {
    history.replaceState(
      {},
      "",
      `?timelines=${encodeURIComponent(btoa(getJSON()))}`,
    );
  });

  return (
    <>
      <button onClick={addTimeline}>Add</button>
      <For each={timelines()}>
        {(timeline) => (
          <Timeline startHour={0} endHour={24} blocks={timeline.blocks} onDelete={() => deleteTimeline(timeline)} />
        )}
      </For>
    </>
  );
}

export default App;

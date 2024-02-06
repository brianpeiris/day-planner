import { Signal } from "solid-js";

export interface IBlock {
  id: number;
  name: string;
  start: number;
  duration: number;
  color: string;
}

export type IBlockSignals = Signal<IBlock>[];

export type IBlocksSignal = Signal<IBlockSignals>;

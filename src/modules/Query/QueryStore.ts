import { Listener, Observer } from "../Observer";
import { QueryKey, Status } from "./types";

// Data
const dataStore: Record<QueryKey, unknown> = {};
const dataObservers: Record<QueryKey, Observer> = {};

export const setQueryData = (key: QueryKey, value: unknown) => {
  dataStore[key] = value;
  dataObservers[key]?.notify();
};

export const getQueryData = (key: QueryKey) => dataStore[key];

export const subscribeQueryData = (key: QueryKey, listener: Listener) => {
  if (!dataObservers[key]) dataObservers[key] = new Observer();
  dataObservers[key].add(listener);
  return () => dataObservers[key].remove(listener);
};

// Status

const statusStore: Record<QueryKey, Status> = {};
const statusObservers: Record<QueryKey, Observer> = {};

export const setQueryStatus = (key: QueryKey, status: Status) => {
  statusStore[key] = status;
  statusObservers[key].notify();
};

export const getQueryStatus = (key: QueryKey): Status => statusStore[key] ?? "idle";

export const subscribeQueryStatus = (key: QueryKey, listener: Listener) => {
  if (!statusObservers[key]) statusObservers[key] = new Observer();
  statusObservers[key].add(listener);
  return () => statusObservers[key].remove(listener);
};

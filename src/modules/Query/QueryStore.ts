import { Status } from "./types";

type Listener = () => void;

const emitChange = (listeners: Record<string, Set<Listener>>, key: string) => {
  listeners[key]?.forEach((cb) => cb());
};

// Data
const dataStore: Record<string, unknown> = {};
const dataListeners: Record<string, Set<Listener>> = {};

export const setQueryData = (key: string, value: unknown) => {
  dataStore[key] = value;
  emitChange(dataListeners, key);
};

export const getQueryData = (key: string) => dataStore[key];

export const subscribeQueryData = (key: string, cb: Listener) => {
  if (!dataListeners[key]) dataListeners[key] = new Set();
  dataListeners[key].add(cb);
  return () => dataListeners[key].delete(cb);
};

// Status

const statusStore: Record<string, Status> = {};
const statusListeners: Record<string, Set<Listener>> = {};

export const setQueryStatus = (key: string, status: Status) => {
  statusStore[key] = status;
  emitChange(statusListeners, key);
};

export const getQueryStatus = (key: string): Status =>
  statusStore[key] ?? "idle";

export const subscribeQueryStatus = (key: string, cb: Listener) => {
  if (!statusListeners[key]) statusListeners[key] = new Set();
  statusListeners[key].add(cb);
  return () => statusListeners[key].delete(cb);
};

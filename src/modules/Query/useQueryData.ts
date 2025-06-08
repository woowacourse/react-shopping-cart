import { useSyncExternalStore } from "react";
import { getQueryData, getQueryStatus, subscribeQueryData, subscribeQueryStatus } from "./QueryStore";
import { Status } from "./type";

export function useQueryData<T>(key: string): T {
  return useSyncExternalStore(
    (cb) => subscribeQueryData(key, cb),
    () => getQueryData(key) as T,
  );
}

export function useQueryStatus(key: string): Status {
  return useSyncExternalStore(
    (cb) => subscribeQueryStatus(key, cb),
    () => getQueryStatus(key),
  );
}

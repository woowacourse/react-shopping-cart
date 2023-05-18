import { MutableRefObject } from "react";

export function isForwardedRef<T>(
  ref: React.ForwardedRef<T>
): ref is MutableRefObject<T> {
  return typeof ref !== "function" && ref !== null;
}

export function isRefCurrent<T>(current: T): current is T {
  return current !== null;
}

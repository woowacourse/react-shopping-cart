import { MutableRefObject } from "react";

export function useRefTypeGuard() {
  function isForwardedRef<T>(
    ref: React.ForwardedRef<T>
  ): ref is MutableRefObject<T> {
    return typeof ref !== "function" && ref !== null;
  }

  function isRefCurrent<T>(current: T): current is T {
    return current !== null;
  }

  return { isForwardedRef, isRefCurrent };
}

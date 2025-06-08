import { ForwardedRef } from 'react';

function useMergeRefs<T>(
  ...refs: (ForwardedRef<T> | null | undefined)[]
): (node: T | null) => void {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}

export default useMergeRefs;

import { useEffect } from 'react';
import type { RefObject } from 'react';

type BodyRef = { current: HTMLElement };

const useScrollStop = (
  shouldStop: boolean,
  ref: BodyRef | RefObject<HTMLElement> = { current: document.body }
) => {
  useEffect(() => {
    const node = ref.current;

    if (!node || !shouldStop) return;

    node.classList.add('hide-overflow');

    return () => {
      node.classList.remove('hide-overflow');
    };
  }, [ref, shouldStop]);
};

export { useScrollStop };

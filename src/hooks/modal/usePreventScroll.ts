import { useEffect } from 'react';

interface UsePreventScrollProps {
  targetEl: HTMLElement;
  isPreventScroll?: boolean;
}
const usePreventScroll = ({ targetEl, isPreventScroll = true }: UsePreventScrollProps) => {
  const preventScroll = (event: WheelEvent | TouchEvent) => {
    event.preventDefault();
  };

  const addPreventScrollEvent = () => {
    targetEl.addEventListener('wheel', preventScroll, { passive: false });
    targetEl.addEventListener('touchmove', preventScroll);
  };

  const removePreventScrollEvent = () => {
    targetEl.removeEventListener('wheel', preventScroll);
    targetEl.removeEventListener('touchmove', preventScroll);
  };

  useEffect(() => {
    isPreventScroll ? addPreventScrollEvent() : removePreventScrollEvent();

    return () => {
      removePreventScrollEvent();
    };
  }, [isPreventScroll]);
};

export default usePreventScroll;

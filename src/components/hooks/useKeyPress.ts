import { useEffect } from 'react';

type KeyPressOptions = {
  eventType?: 'keydown' | 'keyup';
};

const useKeyPress = (
  key: string,
  handler: (e: KeyboardEvent) => void,
  options: KeyPressOptions = {}
) => {
  const { eventType = 'keydown' } = options;

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === key) {
        handler(e);
      }
    };

    window.addEventListener(eventType, keyListener);
    return () => window.removeEventListener(eventType, keyListener);
  }, [key, handler, eventType]);
};

export default useKeyPress;

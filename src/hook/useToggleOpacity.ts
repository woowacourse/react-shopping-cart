import { useState } from 'react';

const ACTIVE = 1.0;
const DEACTIVE = 0.6;
const useToggleOpacity = (defaultValue: number) => {
  const [opacity, setOpacity] = useState<number>(defaultValue);

  const onToggle = () => {
    if (opacity === ACTIVE) {
      setOpacity(DEACTIVE);
    } else {
      setOpacity(ACTIVE);
    }
  };

  return { opacity, onToggle };
};

export default useToggleOpacity;

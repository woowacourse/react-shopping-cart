import { useSpring } from '@react-spring/core';
import { useEffect, useRef } from 'react';

const useNumberAnimation = (num) => {
  const ref = useRef();
  const startNum = ref.current ? ref.current : 0;
  const { resNum } = useSpring({
    from: { resNum: startNum },
    resNum: num,
    config: { mass: 1, tension: 680, friction: 60 },
  });

  useEffect(() => {
    ref.current = num;
  }, [num]);

  return resNum;
};

export default useNumberAnimation;

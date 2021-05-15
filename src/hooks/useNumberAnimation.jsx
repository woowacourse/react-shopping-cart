import { config, useSpring } from '@react-spring/core';
import { useEffect, useRef } from 'react';

const useNumberAnimation = (num) => {
  const ref = useRef();
  const startNum = ref.current ? ref.current : 0;
  const { resNum } = useSpring({
    from: { resNum: startNum },
    resNum: num,
    config: config.stiff,
  });

  useEffect(() => {
    ref.current = num;
  }, [num]);

  return resNum;
};

export default useNumberAnimation;

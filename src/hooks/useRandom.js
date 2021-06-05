import { useState } from 'react';

const useRandom = () => {
  const [randomItems, setRandomItems] = useState([]);

  return { randomItems, setRandomItems };
};

export default useRandom;

import { useState } from 'react';
import { randomNumber } from '../utils';

const useRandom = () => {
  const [randomItems, setRandomItems] = useState([]);

  const randomProducts = (data, length) => {
    const uniqueItems = new Set();

    while (uniqueItems.size < length) {
      const randomNum = randomNumber(1, data.length);
      let item = data.find(({ product_id }) => product_id === randomNum);

      if (item !== undefined) {
        uniqueItems.add(item);
      }
    }

    return [...uniqueItems];
  };
  return { randomItems, setRandomItems, randomProducts };
};

export default useRandom;

import { useState } from 'react';

interface useFetchTypes {
  url: string;
  options?: RequestInit;
}

export const useFetch = ({ url, options }: useFetchTypes) => {
  const [state, setState] = useState([]);
  (async () => {
    try {
      const result = await fetch(url, options);
      const data = await result.json();
      setState(data);
      return state;
    } catch (error) {
      console.error(error);
    }
  })();
  return state;
};

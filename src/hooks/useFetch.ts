import { useState } from 'react';

const useFetch = async <T>(callback: () => T) => {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState(null);

  const fetch = async () => {
    try {
      const value = await callback();
      setData(value);
    } catch (error) {
      setHasError(error);
    }
  };

  fetch();

  return [{ data, fetch }, hasError];
};

export default useFetch;

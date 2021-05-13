import { useEffect, useState } from 'react';

const useFetch = ({ fetchFunc, isSetData }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (isSetData) {
          setData(await fetchFunc());
          setLoading(false);

          return;
        }

        await fetchFunc();
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    })();
  }, []);

  return { isLoading, data, error };
};

export default useFetch;

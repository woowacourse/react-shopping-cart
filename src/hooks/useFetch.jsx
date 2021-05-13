import { useEffect, useState } from 'react';

const useFetch = ({ fetchFunc, isInitSetting }) => {
  const [isLoading, setLoading] = useState(isInitSetting);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initSetting = async () => {
      try {
        setData(await fetchFunc());
        setLoading(false);

        return;
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    isInitSetting && initSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startFetching = async (param) => {
    setLoading(true);

    try {
      await fetchFunc(param);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return { isLoading, data, error, startFetching };
};

export default useFetch;

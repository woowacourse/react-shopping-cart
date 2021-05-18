import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const useFetch = ({ fetchFunc, isInitSetting = false }) => {
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

useFetch.propTypes = {
  fetchFunc: PropTypes.func.isRequired,
  isInitSetting: PropTypes.bool,
};

export default useFetch;

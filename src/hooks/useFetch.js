import { useEffect, useState } from 'react';
import { apiClient } from 'utils';
import PropTypes from 'prop-types';

const useFetch = ({ method, url, handler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data && handler) {
      handler(data);
    }
  }, [data]);

  const fetchApi = async (params = '') => {
    setIsLoading(true);
    setIsError(false);
    try {
      const { data } = await apiClient[method](`${url}/${params}`);
      setData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, isError, data, fetchApi };
};

useFetch.propTypes = {
  method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
  url: PropTypes.string,
};

export default useFetch;

import { useState } from 'react';
import apiClient from 'utils/apiClient';
import PropTypes from 'prop-types';

const useFetch = ({ method, url }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const { data } = await apiClient[method](url);
      setData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, isError, data, fetchData };
};

useFetch.propTypes = {
  method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
  url: PropTypes.string,
};

export default useFetch;

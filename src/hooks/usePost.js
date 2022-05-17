import API_URL from '../constants/api';
import useFetch from './useFetch';

function usePost({ url, data }) {
  const { isLoading, error, apiCall, result } = useFetch({
    url: `${API_URL}/${url}`,
    data,
    method: 'POST',
  });

  return { isLoading, error, apiCall, result };
}

export default usePost;

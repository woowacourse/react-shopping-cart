import API_URL from '../constants/api';
import useFetch from './useFetch';

function useDelete(url) {
  const { isLoading, error, apiCall, result } = useFetch({
    url: `${API_URL}/${url}`,
    method: 'DELETE',
  });

  return { isLoading, error, apiCall, result };
}

export default useDelete;

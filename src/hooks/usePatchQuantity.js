import useFetch from 'hooks/useFetch';

import { API } from 'constants/api';
import { useSelector } from 'react-redux';

function usePatchQuantity(id) {
  const { userId } = useSelector((state) => state.user);

  const {
    isLoading: isPatchLoading,
    apiCall: patchQuantity,
    error: patchError,
  } = useFetch({
    url: `${API.CARTS}/${id}`,
    method: 'PATCH',
    headers: { userId },
  });

  return { isPatchLoading, patchQuantity, patchError };
}

export default usePatchQuantity;

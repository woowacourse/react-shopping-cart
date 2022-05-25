import useFetch from 'hooks/useFetch';
import useUser from 'hooks/useUser';

import { API } from 'constants/api';

function usePatchQuantity(id) {
  const { userId } = useUser();

  const {
    isLoading: isPatchLoading,
    apiCall: patchQuantity,
    error: patchError,
  } = useFetch({
    url: `${API.CARTS}/${userId}/${id}/`,
    method: 'PATCH',
  });

  return { isPatchLoading, patchQuantity, patchError };
}

export default usePatchQuantity;

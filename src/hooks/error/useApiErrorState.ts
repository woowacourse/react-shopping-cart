import { apiErrorState } from './../../recoil/error/atom';
import { useRecoilState } from 'recoil';

const useApiErrorState = () => {
  const [apiError, setApiError] = useRecoilState(apiErrorState);

  const resetApiError = () => {
    setApiError(null);
  };

  return {
    apiError,
    setApiError,
    resetApiError,
  };
};

export default useApiErrorState;

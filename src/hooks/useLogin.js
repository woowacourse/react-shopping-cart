import { useEffect } from 'react';
import useFetch from './useFetch';

const userId = 'a1b2c3d4';
const password = 1234;

function useLogin() {
  const {
    isLoading,
    error,
    apiCall: login,
    result: isLoginSuccess,
  } = useFetch({
    url: `/${API.AUTH}`,
    headers: { userId, password },
  });

  useEffect(() => {
    try {
      login();
    } catch (error) {}
  }, []);

  return { isLoading, error, isLoginSuccess };
}

export default useLogin;

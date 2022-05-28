import { API } from 'constants/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from 'store/user';
import useFetch from './useFetch';

const userId = 'a1b2c3d4';
const password = 1234;

function useUser() {
  const dispatch = useDispatch();

  const { apiCall: loginApiCall, result: isLoginSuccess } = useFetch({
    url: `/${API.AUTH}/login`,
    method: 'POST',
    headers: { userId, password },
  });
  const { apiCall: logoutApiCall, result: isLogoutSuccess } = useFetch({
    url: `/${API.AUTH}/logout`,
    method: 'POST',
  });

  const login = async () => {
    await loginApiCall();
  };

  const logout = async () => {
    await logoutApiCall();
  };

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(logIn(userId));
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLogoutSuccess) {
      dispatch(logOut());
    }
  }, [isLogoutSuccess]);

  return { login, logout };
}

export default useUser;

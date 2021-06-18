import { useAppSelector } from '../../states/store';

const useLogin = () => {
  const [userName] = useAppSelector(({ login: { userName } }) => [userName]);

  return { userName };
};

export default useLogin;

import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../constants';

export const useGoToAnotherPage = () => {
  const navigator = useNavigate();
  const location = useLocation().pathname;

  const goToPage = (path: keyof typeof PATH) => {
    if (location !== path) navigator(path);
  };

  return goToPage;
};

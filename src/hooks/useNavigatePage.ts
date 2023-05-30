import { useNavigate } from 'react-router-dom';

const useNavigatePage = () => {
  const navigator = useNavigate();
  const goHome = () => {
    navigator('/');
  };
  const goCart = () => {
    navigator('/cart');
  };

  return { goHome, goCart };
};

export default useNavigatePage;

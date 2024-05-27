import { useNavigate } from 'react-router-dom';

const useNavigatePage = (route: string) => {
  const navigate = useNavigate();

  const navigatePageRoute = () => {
    navigate(route);
  };

  return navigatePageRoute;
};

export default useNavigatePage;

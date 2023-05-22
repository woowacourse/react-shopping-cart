import { useNavigate } from 'react-router-dom';

const useNavigateHome = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
    window.location.reload();
  };

  return handleNavigateHome;
};

export default useNavigateHome;

import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './Navigation.styled';
import { ROUTE_PATHS } from '@routes/route.constant';
import BackButton from '../BackButton/BackButton';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Styled.Navigation>
      {location.pathname === ROUTE_PATHS.root ? (
        <button onClick={() => navigate(ROUTE_PATHS.root)}>SHOP</button>
      ) : (
        <BackButton onClick={() => navigate(-1)} />
      )}
    </Styled.Navigation>
  );
};

export default Navigation;

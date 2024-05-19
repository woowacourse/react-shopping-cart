import { ROUTE_PATHS } from '@routes/route.constant';
import { useLocation, useNavigate } from 'react-router-dom';

import BackButton from '../BackButton/BackButton';

import * as Styled from './Navigation.styled';

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

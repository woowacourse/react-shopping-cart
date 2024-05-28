import { isValidPathName } from '@components/common/Navigation/Navigation.util';
import { ROUTE_PATHS } from '@routes/route.constant';
import { useLocation, useNavigate } from 'react-router-dom';

import BackButton from '../BackButton/BackButton';

import * as Styled from './Navigation.styled';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const NAVIGATION_HEADER_MAP = {
    [ROUTE_PATHS.root]: <button onClick={() => navigate(ROUTE_PATHS.root)}>SHOP</button>,
    [ROUTE_PATHS.orderConfirm]: <BackButton onClick={() => navigate(-1)} />,
    [ROUTE_PATHS.paymentConfirm]: null,
  } as const;

  const NavigationHeader = isValidPathName(location.pathname) ? NAVIGATION_HEADER_MAP[location.pathname] : null;

  return <Styled.Navigation>{NavigationHeader}</Styled.Navigation>;
};

export default Navigation;

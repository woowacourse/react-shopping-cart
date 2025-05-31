import {Outlet} from 'react-router';
import * as S from './NavBar.styles';

import {useError} from '../../../provider/errorProvider.tsx';
import {useLocation, useNavigate} from 'react-router';
import {ROUTE_PATHS} from '../../../route/path.ts';
import Toast from '../../common/Toast/index.tsx';

const NavBar = () => {
  const error = useError();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  return (
    <>
      <S.Container>
        {pathname === ROUTE_PATHS.MAIN ? (
          <S.Logo>SHOP</S.Logo>
        ) : (
          <S.BackIcon
            src="./back-icon.svg"
            onClick={() => navigate(ROUTE_PATHS.MAIN)}
          />
        )}
      </S.Container>
      {error && <Toast message={error} status="error" />}
      <Outlet />
    </>
  );
};

export default NavBar;

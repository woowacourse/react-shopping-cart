import { HeaderStyle } from './Header.style';
import Logo from '../../assets/logo.svg';
import Arrow from '../../assets/arrow.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <img src={Arrow} alt="뒤로가기" className="header_arrow" />
    </button>
  );
};

const LogoButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(0)}>
      <img src={Logo} alt="로고" className="header_logo" />
    </button>
  );
};

export default function Header() {
  const { pathname } = useLocation();

  return (
    <HeaderStyle>
      {pathname === '/' ? (
        <LogoButton />
      ) : pathname === '/order-confirm' ? (
        <BackButton />
      ) : null}
    </HeaderStyle>
  );
}

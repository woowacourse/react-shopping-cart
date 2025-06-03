import { HeaderStyle } from './Header.styles';
import IconLogo from '/public/icon/ic_logo.svg';
import { ROUTE } from '../../../constants/systemConstants';
const Header = () => {
  return (
    <section css={HeaderStyle}>
      <a href={ROUTE.HOME}>
        <img src={IconLogo} alt="logo" />
      </a>
    </section>
  );
};

export default Header;

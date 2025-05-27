import { HeaderStyle } from './Header.styles';
import IconLogo from '/public/icon/ic_logo.svg';

const Header = () => {
  return (
    <section css={HeaderStyle}>
      <a href="/">
        <img src={IconLogo} alt="logo" />
      </a>
    </section>
  );
};

export default Header;

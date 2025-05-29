import { HeaderStyle } from "./Header.styles";
import IconLogo from "/public/icon/ic_logo.svg";
import { ROUTE } from "../../../constants/systemConstants";
const Header = () => {
  return (
    <section css={HeaderStyle}>
      <a href={ROUTE.CART}>
        <img src={IconLogo} alt="logo" />
      </a>
    </section>
  );
};

export default Header;

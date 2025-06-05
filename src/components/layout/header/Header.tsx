import { headerContainer } from "./Header.styles";
import IconLogo from "/public/icon/ic_logo.svg";
import backIcon from "/public/icon/ic_back.svg";
import { ROUTE } from "../../../constants/systemConstants";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const logo = {
    [ROUTE.CART]: IconLogo,
    [ROUTE.ORDER_COMPLETE]: backIcon,
    [ROUTE.ORDER_CONFIRMATION]: backIcon,
  };

  return (
    <section css={headerContainer}>
      <a href={ROUTE.CART}>
        <img src={logo[location.pathname]} alt="logo" />
      </a>
    </section>
  );
};

export default Header;

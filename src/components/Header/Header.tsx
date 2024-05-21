import { BackButtonStyle, HeaderStyle, ShopButtonStyle } from "./Header.style";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { RoutePaths, RoutesObject } from "@/App";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button css={BackButtonStyle} onClick={() => navigate(-1)}>
      <RiArrowLeftLine size={30} />
    </button>
  );
};

const ShopButton = () => {
  const navigate = useNavigate();

  return (
    <button css={ShopButtonStyle} onClick={() => navigate(0)}>
      SHOP
    </button>
  );
};

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname as RoutePaths;

  const navButton: RoutesObject<React.ReactElement> = {
    "/": <ShopButton />,
    "/order": <BackButton />,
  };

  return (
    <header>
      <div css={HeaderStyle}>{navButton[pathname]}</div>
    </header>
  );
};

export default Header;

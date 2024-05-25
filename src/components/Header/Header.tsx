/** @jsxImportSource @emotion/react */
import { BackButtonStyle, HeaderStyle, ShopButtonStyle } from "./Header.style";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

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
  const { pathname } = useLocation();

  if (pathname !== "/" && pathname !== "/order" && pathname !== "/payment") {
    return;
  }

  const routeTitle = {
    "/": <ShopButton />,
    "/order": <BackButton />,
    "/payment": <></>,
  };

  return <div css={HeaderStyle}>{routeTitle[pathname]}</div>;
};

export default Header;

import { BackButtonStyle, HeaderStyle, ShopButtonStyle } from "./Header.style";
import { useLocation } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { RoutePaths, RoutesObject } from "@/Providers/RouteInfoProvider";
import CustomLink from "../CustomLink/CustomLink";

const BackButton = () => {
  return (
    <CustomLink style={BackButtonStyle} To={-1}>
      <RiArrowLeftLine size={30} />
    </CustomLink>
  );
};

const ShopButton = () => {
  return (
    <CustomLink style={ShopButtonStyle} To={0}>
      SHOP
    </CustomLink>
  );
};

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname as RoutePaths;

  const navButton: RoutesObject<React.ReactElement> = {
    "/": <ShopButton />,
    "/check-order": <BackButton />,
    "/order": <BackButton />,
  };

  return (
    <header>
      <div css={HeaderStyle}>{navButton[pathname]}</div>
    </header>
  );
};

export default Header;

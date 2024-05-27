import { useLocation } from "react-router-dom";
import { SerializedStyles } from "@emotion/react";

import { BackButtonStyle, HeaderStyle, ShopButtonStyle } from "./Header.style";

import { HeaderRouteInfoContext } from "@/Providers/RouteInfoProvider/RouteInfoProvider";
import useCustomContext from "@/hooks/useCustomContext";

import CustomLink from "../CustomLink/CustomLink";
import { RoutePaths, RoutesObject } from "@/Providers/RouteInfoProvider/useRouteInfo";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname as RoutePaths;
  const headerInfo = useCustomContext(HeaderRouteInfoContext)[pathname];

  const routesStyle: RoutesObject<SerializedStyles> = {
    "/": ShopButtonStyle,
    "/check-order": BackButtonStyle,
    "/order": BackButtonStyle,
  };

  return (
    <header>
      <div css={HeaderStyle}>
        <CustomLink style={routesStyle[pathname]} To={headerInfo.linkTo}>
          {headerInfo.leftButtonContent}
        </CustomLink>
      </div>
    </header>
  );
};

export default Header;

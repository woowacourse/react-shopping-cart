import { useLocation } from "react-router-dom";

import { FooterStyle } from "./Footer.style";
import { FooterRouteInfoContext } from "@/Providers/RouteInfoProvider/RouteInfoProvider";
import useCustomContext from "@/hooks/useCustomContext";
import CustomLink from "../CustomLink/CustomLink";
import { RoutePaths } from "@/Providers/RouteInfoProvider/useRouteInfo";

const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname as RoutePaths;
  const footerInfo = useCustomContext(FooterRouteInfoContext)[pathname];

  return (
    <footer>
      <CustomLink
        disabled={footerInfo.isButtonDisabled}
        style={FooterStyle}
        To={footerInfo.linkTo}
        handleClick={footerInfo?.handleClick}
      >
        {footerInfo.content}
      </CustomLink>
    </footer>
  );
};

export default Footer;

import { useLocation } from "react-router-dom";

import { FooterStyle } from "./Footer.style";
import { FooterRouteInfoContext, RoutePaths } from "@/Providers/RouteInfoProvider";
import useCustomContext from "@/hooks/useCustomContext";

const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname as RoutePaths;
  const footerInfo = useCustomContext(FooterRouteInfoContext)[pathname];

  return (
    <footer>
      <button disabled={footerInfo.isButtonDisabled} css={FooterStyle} onClick={footerInfo.handleClick}>
        {footerInfo.content}
      </button>
    </footer>
  );
};

export default Footer;

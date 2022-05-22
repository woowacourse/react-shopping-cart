import { Link } from "react-router-dom";

import StyledLogoLink from "@/components/header/logo-link/LogoLink.styled";

function LogoLink() {
  return (
    <StyledLogoLink>
      <Link className="logo-link" to="/">
        MINCHO SHOP
      </Link>
    </StyledLogoLink>
  );
}

export default LogoLink;

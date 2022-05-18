import StyledLogoLink from "@/components/header/logo-link/LogoLink.styled";

function LogoLink({ href, className = "logo-link" }) {
  return (
    <StyledLogoLink href={href} className={className}>
      MINCHO SHOP
    </StyledLogoLink>
  );
}

export default LogoLink;

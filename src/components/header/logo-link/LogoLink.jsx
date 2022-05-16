import StyledLogoLink from "./LogoLink.styled";

function LogoLink({ src, href, className = "logo-link" }) {
  return (
    <StyledLogoLink href={href} className={className}>
      <img src={src} alt="" />
    </StyledLogoLink>
  );
}

export default LogoLink;

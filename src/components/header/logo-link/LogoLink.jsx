import styles from "@shared/header/logo-link/logo-link.module";

const cn = require("classnames");

function LogoLink({ children, href, className }) {
  return (
    <a href={href} className={cn(styles.logoLink, className)}>
      {children}
    </a>
  );
}

export default LogoLink;

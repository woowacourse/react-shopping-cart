import styles from "./logo-link.module.scss";

const cn = require("classnames");

function LogoLink({ children, href, className }) {
  return (
    <a href={href} className={cn("logoLink", styles.logoLink, className)}>
      {children}
    </a>
  );
}

export default LogoLink;

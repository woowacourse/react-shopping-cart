import styles from "./logo-link.module.scss";

const cn = require("classnames");

function LogoLink({ children, href, className }) {
  return (
    <a href={href} className={cn("logo-link", styles["logo-link"], className)}>
      {children}
    </a>
  );
}

export default LogoLink;

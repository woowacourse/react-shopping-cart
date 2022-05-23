import styles from "@shared/header/logo-link/logo-link.module";
import { Link } from "react-router-dom";

const cn = require("classnames");

function LogoLink({ children, href, className }) {
  return (
    <Link href={href} className={cn(styles.logoLink, className)}>
      {children}
    </Link>
  );
}

export default LogoLink;

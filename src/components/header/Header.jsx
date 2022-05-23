import Logo from "@assets/images/logo.svg";
import Menu from "@shared/header/menu/Menu";
import styles from "@shared/header/header.module";
import { Link } from "react-router-dom";

const cn = require("classnames");

function Header({ className }) {
  return (
    <div className={cn(styles.header, className)}>
      <div className="flex wrapper place-content-between">
        <Link to="/" className={styles.siteLogo}>
          <Logo width="50px" height="44px" />
          <span className={styles.title}>WOOWA SHOP</span>
        </Link>
        <Menu />
      </div>
    </div>
  );
}

export default Header;

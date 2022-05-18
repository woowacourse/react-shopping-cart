import Logo from "@assets/images/logo.svg";
import Menu from "@shared/header/menu/Menu";
import styles from "@shared/header/header.module";

const cn = require("classnames");

function Header({ className }) {
  return (
    <div className={cn("header", styles.header, className)}>
      <div className="wrapper flex place-content-between">
        <a href="/" className={styles.siteLogo}>
          <Logo width="50px" height="44px" />
          <span className={styles.title}>WOOWA SHOP</span>
        </a>
        <Menu />
      </div>
    </div>
  );
}

export default Header;

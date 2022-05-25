import cn from "classnames";
import Logo from "@assets/images/logo.svg";
import Menu from "@shared/header/menu/Menu";
import styles from "@shared/header/header.module";
import { Link } from "react-router-dom";

function Header({ className }) {
  return (
    <div className={cn(styles.header, className)}>
      <div className="flex wrapper place-content-between">
        <Link to="/" className={styles.siteLogo}>
          <div className={styles.logo}>
            <Logo
              width="auto"
              height="auto"
              viewBox="0 0 50 44"
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
          <span className={styles.title}>WOOWA SHOP</span>
        </Link>
        <Menu />
      </div>
    </div>
  );
}

export default Header;

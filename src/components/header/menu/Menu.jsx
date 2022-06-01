import cn from "classnames";
import styles from "@shared/header/menu/menu.module";
import { Link } from "react-router-dom";

function Menu({ className }) {
  return (
    <div className={cn(styles.menu, className)}>
      <ul className={styles.ul}>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

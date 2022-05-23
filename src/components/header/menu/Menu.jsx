import styles from "@shared/header/menu/menu.module";
import { Link } from "react-router-dom";

const cn = require("classnames");

function Menu({ className }) {
  return (
    <div className={cn(styles.menu, className)}>
      <ul className={styles.ul}>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
        <li>
          <a href="/">주문목록</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

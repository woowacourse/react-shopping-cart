import styles from "@shared/header/menu/menu.module";

const cn = require("classnames");

function Menu({ className }) {
  return (
    <div className={cn(styles.menu, className)}>
      <ul className={styles.ul}>
        <li>
          <a href="/cart">장바구니</a>
        </li>
        <li>
          <a href="/">주문목록</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

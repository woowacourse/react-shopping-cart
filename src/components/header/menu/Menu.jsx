import styles from "./menu.module.scss";

const cn = require("classnames");

function Menu({ className }) {
  return (
    <div className={cn("menu", styles.menu, className)}>
      <ul className={styles.ul}>
        <li>
          <a href="/">장바구니</a>
        </li>
        <li>
          <a href="/">주문목록</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

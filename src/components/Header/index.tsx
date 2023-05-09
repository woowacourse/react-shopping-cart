import { ReactComponent as ShopIcon } from '../../assets/shop-icon.svg';
import styles from './index.module.css';

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <ShopIcon />
        SHOP
      </h1>
      <div className={styles.cart}>
        <button>장바구니</button>
        <div className={styles['cart-count']}>2</div>
      </div>
    </header>
  );
};

export default Header;

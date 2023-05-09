import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.css';

const Header = () => {
  return (
    <header className={styles.container}>
      <Logo />
      <div className={styles.cart}>
        <button>장바구니</button>
        <div className={styles['cart-count']}>2</div>
      </div>
    </header>
  );
};

export default Header;

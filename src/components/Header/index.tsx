import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.css';
import { $Cart } from '../../recoil/atom';
import { Link } from 'react-router-dom';

const Header = () => {
  const cart = useRecoilValue($Cart);
  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.cart}>
        <Link to="cart">
          <button>장바구니</button>
        </Link>
        <div className={styles['cart-count']}>{cart.length}</div>
      </div>
    </header>
  );
};

export default Header;

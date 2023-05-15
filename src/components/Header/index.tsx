import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { $Cart } from '../../recoil/atom';

function Header() {
  const cart = useRecoilValue($Cart);

  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.cart}>
        <button>장바구니</button>
        <div className={styles['cart-count']}>{cart.length}</div>
      </div>
    </header>
  );
}

export default Header;

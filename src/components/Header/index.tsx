import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.css';
import { $Cart } from '../../recoil/atom';
import { Link } from 'react-router-dom';
import useNavigateHome from '../../hooks/useNavigateHome';

const Header = () => {
  const handleNavigateHome = useNavigateHome();
  const cart = useRecoilValue($Cart);

  return (
    <header className={styles.container}>
      <button onClick={handleNavigateHome}>
        <Logo />
      </button>
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

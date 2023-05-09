import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.css';
import { $CartCount } from '../../recoil/atom';

const Header = () => {
  const CartCount = useRecoilValue($CartCount);
  return (
    <header className={styles.container}>
      <Logo />
      <div className={styles.cart}>
        <button>장바구니</button>
        <div className={styles['cart-count']}>{Object.values(CartCount).reduce((acc, count) => acc + count, 0)}</div>
      </div>
    </header>
  );
};

export default Header;

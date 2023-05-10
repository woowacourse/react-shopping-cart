import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.css';
import { $CartCountTotal } from '../../recoil/atom';

const Header = () => {
  const cartCountTotal = useRecoilValue($CartCountTotal);
  return (
    <header className={styles.container}>
      <Logo />
      <div className={styles.cart}>
        <button>장바구니</button>
        <div className={styles['cart-count']}>{cartCountTotal}</div>
      </div>
    </header>
  );
};

export default Header;

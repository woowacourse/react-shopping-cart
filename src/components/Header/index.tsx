import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.scss';
import { $CartCountTotal } from '../../recoil/atom';
import { Link } from 'react-router-dom';

function Header() {
  const cartCountTotal = useRecoilValue($CartCountTotal);
  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.cart}>
        <button>장바구니</button>
        <div className={styles['cart-count']}>{cartCountTotal}</div>
      </div>
    </header>
  );
}

export default Header;

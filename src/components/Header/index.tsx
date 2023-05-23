import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import useToast from '../../hooks/useToast';
import { $CartIdList } from '../../recoil/atom';
import styles from './index.module.scss';

function Header() {
  const cartIdList = useRecoilValue($CartIdList);
  const Toast = useToast();

  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.cart}>
        <Link to="/cart">
          <button type="button" onClick={Toast.reset}>
            장바구니
          </button>
        </Link>
        <div className={styles['cart-count']}>{cartIdList.length}</div>
      </div>
    </header>
  );
}

export default Header;

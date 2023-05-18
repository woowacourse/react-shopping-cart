import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { $CartIdList, $ToastStateList } from '../../recoil/atom';
import styles from './index.module.scss';

function Header() {
  const cartIdList = useRecoilValue($CartIdList);
  const setToastStateList = useSetRecoilState($ToastStateList);

  const handleClick = () => {
    setToastStateList([]);
  };

  return (
    <header className={styles.container}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.cart}>
        <Link to="/cart">
          <button type="button" onClick={handleClick}>
            장바구니
          </button>
        </Link>
        <div className={styles['cart-count']}>{cartIdList.length}</div>
      </div>
    </header>
  );
}

export default Header;

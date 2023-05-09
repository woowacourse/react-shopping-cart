import { useRecoilValue } from 'recoil';

import Logo from '../../assets/logo.svg';
import { cartListState } from '../../pages/ProductListPage';
import styles from './style.module.css';

const Header = () => {
  const cartItemList = useRecoilValue(cartListState);
  console.log(cartItemList);
  return (
    <header className={styles.container}>
      <img src={Logo} alt="logo" />
      <button type="button">
        장바구니 <span className={styles.cartItemCount}>{cartItemList.length}</span>
      </button>
    </header>
  );
};

export default Header;

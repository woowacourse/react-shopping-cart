import { memo } from 'react';
import { useRecoilValue } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import Logo from '../../assets/logo.png';
import { cartListState } from '../../pages/ProductListPage';
import styles from './style.module.css';

const Header = () => {
  const cartItemList = useRecoilValue(cartListState);

  return (
    <header>
      <div className={styles.container}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <button type="button">
          {cartItemList.length > 0 && (
            <span className={styles.cartItemCount}>{cartItemList.length}</span>
          )}
          <img src={CartIcon} alt="cart icon" className={styles.cartIcon} />
          <span className={styles.label}>장바구니</span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);

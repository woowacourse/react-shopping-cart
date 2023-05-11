import { memo } from 'react';
import { useRecoilValue } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import Logo from '../../assets/logo.png';
import { cartListItemCountState } from '../../store/cart';
import styles from './style.module.css';

const Header = () => {
  const cartListItemCount = useRecoilValue(cartListItemCountState);

  return (
    <header>
      <div className={styles.container}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <button type="button">
          {cartListItemCount > 0 && (
            <span className={styles.cartItemCount}>{cartListItemCount}</span>
          )}
          <img src={CartIcon} alt="cart icon" className={styles.cartIcon} />
          <span className={styles.label}>장바구니</span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);

import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CartIcon from '../../assets/cart-icon.svg';
import Logo from '../../assets/logo.png';
import { cartListState } from '../../store/cart';
import styles from './style.module.css';

const Header = () => {
  const navigate = useNavigate();
  const cartItemList = useRecoilValue(cartListState);

  const navigateToMainPage = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToCartPage = useCallback(() => {
    navigate('/cartlist');
  }, [navigate]);

  return (
    <header>
      <div className={styles.container}>
        <img src={Logo} alt="logo" className={styles.logo} onClick={navigateToMainPage} />
        <button type="button">
          {cartItemList.length > 0 && (
            <span className={styles.cartItemCount}>{cartItemList.length}</span>
          )}
          <img
            src={CartIcon}
            alt="cart icon"
            className={styles.cartIcon}
            onClick={navigateToCartPage}
          />
          <span className={styles.label}>장바구니</span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);

import { memo } from 'react';
import { useRecoilValue } from 'recoil';

import Logo from '../../assets/logo.png';
import { cartListState } from '../../pages/ProductListPage';
import styles from './style.module.css';

const Header = () => {
  const cartItemList = useRecoilValue(cartListState);

  return (
    <header>
      <div className={styles.container}>
        <img src={Logo} alt="logo" />
        <button type="button">
          장바구니 <span className={styles.cartItemCount}>{cartItemList.length}</span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);

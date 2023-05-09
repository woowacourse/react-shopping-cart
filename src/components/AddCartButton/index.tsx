import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';
import useBooleanState from '../../hooks/useBooleanState';
import styles from './index.module.css';
import { useState } from 'react';

const AddCartButton = () => {
  const { value: clicked, setValue: setClicked } = useBooleanState(false);
  const [cartCount, setCartCount] = useState(1);

  const upCount = () => {
    setCartCount(prev => prev + 1);
  };

  const downCount = () => {
    if (cartCount === 1) {
      setClicked(false);
      return;
    }
    setCartCount(prev => prev - 1);
  };

  return (
    <div className={styles['container']}>
      {clicked ? (
        <div className={styles['counter-container']}>
          <div>{cartCount}</div>
          <button onClick={upCount}>
            <ArrowUp />
          </button>
          <button onClick={downCount}>
            <ArrowDown />
          </button>
        </div>
      ) : (
        <button onClick={() => setClicked(true)}>
          <ShopIcon />
        </button>
      )}
    </div>
  );
};

export default AddCartButton;

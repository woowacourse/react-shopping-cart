import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';
import useBooleanState from '../../hooks/useBooleanState';
import styles from './index.module.css';
import { useSetRecoilState } from 'recoil';
import { $CartCount } from '../../recoil/atom';
import { useState } from 'react';

interface AddCardButtonProps {
  id: number;
}

const AddCartButton = ({ id }: AddCardButtonProps) => {
  const { value: clicked, setValue: setClicked } = useBooleanState(false);
  const setCartCount = useSetRecoilState($CartCount);
  const [count, setCount] = useState(1);

  const handleClick = () => {
    setClicked(true);
    setCartCount(prev => ({ ...prev, [id]: count }));
  };

  const upCount = () => {
    setCount(prev => prev + 1);
    setCartCount(prev => ({ ...prev, [id]: count + 1 }));
  };

  const downCount = () => {
    if (count === 1) {
      setClicked(false);
      setCartCount(prev => ({ ...prev, [id]: count - 1 }));
      return;
    }
    setCartCount(prev => ({ ...prev, [id]: count - 1 }));
    setCount(prev => prev - 1);
  };

  return (
    <div className={styles['container']}>
      {clicked ? (
        <div className={styles['counter-container']}>
          <div>{count}</div>
          <button onClick={upCount}>
            <ArrowUp />
          </button>
          <button onClick={downCount}>
            <ArrowDown />
          </button>
        </div>
      ) : (
        <button onClick={handleClick}>
          <ShopIcon />
        </button>
      )}
    </div>
  );
};

export default AddCartButton;

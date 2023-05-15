import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import styles from './index.module.scss';
import CountButton from '../Common/CountButton';
import useMutationQuery from '../../hooks/useMutationQuery';
import { useState } from 'react';
import type { CartItem } from '../../types';
import { useRecoilState } from 'recoil';
import { $Cart } from '../../recoil/atom';

interface AddCardButtonProps {
  id: number;
}

function AddCartButton({ id }: AddCardButtonProps) {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useRecoilState($Cart);
  const { mutateQuery } = useMutationQuery<Record<string, number>, CartItem>('/cart-items');

  const handleClick = async () => {
    await mutateQuery('POST', { productId: id });
    setCart(prev => [...prev, id]);
    setCount(prev => prev + 1);
  };

  const handleUpButton = async () => {
    await mutateQuery('PATCH', { quantity: count + 1 }, String(id));
    setCount(prev => prev + 1);
  };

  const handleDownButton = async () => {
    await mutateQuery('PATCH', { quantity: count - 1 }, String(id));

    if (count === 1) {
      setCart(prev => prev.filter(item => item !== id));
    }

    setCount(prev => prev - 1);
  };

  return (
    <div className={styles['container']}>
      {cart.find(cartId => cartId === id) ? (
        <CountButton count={count} handleUpButton={handleUpButton} handleDownButton={handleDownButton} />
      ) : (
        <button onClick={handleClick}>
          <ShopIcon />
        </button>
      )}
    </div>
  );
}
export default AddCartButton;

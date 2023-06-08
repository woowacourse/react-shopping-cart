import styles from './index.module.css';
import type { CartItem } from '../../types';
import CountButton from '../CountButton';
import { ReactComponent as GarbageIcon } from '../../assets/garbage-icon.svg';
import { deleteCartItem, updateCartItem } from '../../api/cartApi';
import ERROR_MESSAGE from '../../constant/errorMessage';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { $Cart } from '../../recoil/atom';
import { ForwardedRef, forwardRef, useState } from 'react';
import { $CheckedCartState } from '../../recoil/atom';

interface CartProductProps {
  cartItem: CartItem;
}

const CartProduct = ({ cartItem }: CartProductProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { quantity, product } = cartItem;
  const setCart = useSetRecoilState($Cart);
  const [count, setCount] = useState(quantity);
  const setCheckedCartData = useSetRecoilState($CheckedCartState);

  const handleUpButton = async () => {
    try {
      await updateCartItem(product.id, count + 1);
      setCount((prev) => prev + 1);
    } catch (e) {
      toast.error(ERROR_MESSAGE.quantity);
    }
  };

  const handleDownButton = async () => {
    try {
      await updateCartItem(product.id, count - 1);
      if (count === 1) {
        return;
      }
    } catch (e) {
      toast.error(ERROR_MESSAGE.quantity);
    }

    setCount((prev) => prev - 1);
  };

  const handleDeleteButton = async () => {
    try {
      await deleteCartItem(product.id);
      setCart((prev) => prev.filter((item) => item !== product.id));
      setCheckedCartData((prev) => prev.filter((item) => item.product.id !== product.id));
    } catch (e) {
      toast.error(ERROR_MESSAGE.delete);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles['product-info-container']}>
        <input className={styles['checkbox-input']} type="checkbox" name="select-item" ref={ref} />
        <div aria-label="image-box">
          <img src={product.imageUrl} alt={product.name} className={styles.image} />
        </div>
        <span aria-label="product-name">{product.name}</span>
      </div>
      <div className={styles['action-container']}>
        <button aria-label="delete-button" onClick={handleDeleteButton}>
          <GarbageIcon />
        </button>
        <CountButton count={count} handleUpButton={handleUpButton} handleDownButton={handleDownButton} />
        <span aria-label="product-price">{(product.price * count).toLocaleString()}원</span>
      </div>
    </section>
  );
};

export default forwardRef(CartProduct);

import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import styles from './index.module.css';
import { useSetRecoilState } from 'recoil';
import { $Cart } from '../../recoil/atom';
import CountButton from '../CountButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, deleteCartItem, updateCartItem } from '../../api/cartApi';
import errorMessage from '../../constant/errorMessage';
import { useState } from 'react';

interface AddCardButtonProps {
  id: number;
  name: string;
}

const AddCartButton = ({ id, name }: AddCardButtonProps) => {
  const [count, setCount] = useState(0);
  const setCart = useSetRecoilState($Cart);

  const handleClick = async () => {
    try {
      await addToCart(id);
      setCart(prev => [...prev, id]);
      setCount(prev => prev + 1);
    } catch (e) {
      toast.error(`${name}${errorMessage.addProduct}`);
    }
  };

  const handleUpButton = async () => {
    try {
      await updateCartItem(id, count + 1);
      setCount(prev => prev + 1);
    } catch (e) {
      toast.error(`${name}${errorMessage.quantity}`);
    }
  };

  const handleDownButton = async () => {
    try {
      await updateCartItem(id, count - 1);
      if (count === 1) {
        await deleteCartItem(id);
        setCart(prev => prev.filter(item => item !== id));
      }
    } catch (e) {
      toast.error(`${name}${errorMessage.quantity}`);
    }

    setCount(prev => prev - 1);
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputCount = event.target.value.trim() !== '' ? parseInt(event.target.value) : 0;
    try {
      setCount(inputCount);
      if (inputCount === 0) {
        await deleteCartItem(id);
        setCart(prev => prev.filter(item => item !== id));
      } else {
        await updateCartItem(id, inputCount);
      }
    } catch (e) {
      toast.error(`${name}${errorMessage.quantity}`);
    }
  };

  return (
    <div className={styles['container']}>
      {count > 0 ? (
        <CountButton
          count={count}
          handleUpButton={handleUpButton}
          handleDownButton={handleDownButton}
          handleInputChange={handleInputChange}
        />
      ) : (
        <button onClick={handleClick}>
          <ShopIcon />
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddCartButton;

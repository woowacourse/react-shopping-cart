import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import useBooleanState from '../../hooks/useBooleanState';
import styles from './index.module.css';
import { useSetRecoilState } from 'recoil';
import { $CartCount } from '../../recoil/atom';
import CountButton from '../CountButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, deleteCartItem, updateCartItem } from '../../api/cartApi';
import errorMessage from '../../constant/errorMessage';

interface AddCardButtonProps {
  id: number;
}

const AddCartButton = ({ id }: AddCardButtonProps) => {
  const { value: clicked, setValue: setClicked } = useBooleanState(false);
  const setCartCount = useSetRecoilState($CartCount);

  const getCount = async (count: number) => {
    try {
      setCartCount(prev => ({ ...prev, [id]: count }));
      if (count === 0) {
        await deleteCartItem(id);
        setClicked(false);
        return;
      }

      await updateCartItem(id, count);
    } catch (e) {
      toast.error(errorMessage);
    }
  };

  const handleClick = async () => {
    try {
      await addToCart(id);
      setClicked(true);
      setCartCount(prev => ({ ...prev, [id]: 1 }));
    } catch (e) {
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles['container']}>
      {clicked ? (
        <CountButton getCount={getCount} />
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

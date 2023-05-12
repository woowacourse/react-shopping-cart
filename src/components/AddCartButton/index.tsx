import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import useBooleanState from '../../hooks/useBooleanState';
import styles from './index.module.scss';
import { useSetRecoilState } from 'recoil';
import { $CartCount } from '../../recoil/atom';
import CountButton from '../Common/CountButton';

interface AddCardButtonProps {
  id: number;
}

function AddCartButton({ id }: AddCardButtonProps) {
  const { value: clicked, setValue: setClicked } = useBooleanState(false);
  const setCartCount = useSetRecoilState($CartCount);

  const getCount = async (count: number) => {
    setCartCount(prev => ({ ...prev, [id]: count }));
    if (count === 0) {
      await fetch(`/cart-items/${id}`, {
        method: 'DELETE',
      });
      setClicked(false);
      return;
    }

    await fetch(`/cart-items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity: count,
      }),
    });
  };

  const handleClick = async () => {
    await fetch('/cart-items', {
      method: 'POST',
      body: JSON.stringify({
        productId: id,
      }),
    });
    setClicked(true);
    setCartCount(prev => ({ ...prev, [id]: 1 }));
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
    </div>
  );
}

export default AddCartButton;

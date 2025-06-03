// src/components/CartItem/CartItem.tsx
import * as styles from './CartItem.style';
import Stepper from './Stepper';
import { RemoveButton } from './RemoveButton';
import CheckBox from '../common/CheckBox';
import { CartItemType } from '../../types/cartItem';
import { useCartActions } from '../../hooks/useCartActions';
import { useCallback } from 'react';

interface CartItemProps {
  item: CartItemType;
  handleCheckBoxChange: () => void;
  checked: boolean;
  handleDeleteCheck: () => void;
}

export default function CartItem({ item, handleCheckBoxChange, checked, handleDeleteCheck }: CartItemProps) {
  const { id: cartItemId, product, quantity: cartQuantity } = item;
  const { name, price, imageUrl } = product;

  const { changeQuantity, deleteCart, isChanging, isDeleting } = useCartActions();

  const handlePlus = useCallback(() => {
    changeQuantity({ cartItemId, newQuantity: cartQuantity + 1 });
  }, [cartItemId, cartQuantity, changeQuantity]);

  const handleMinus = useCallback(() => {
    changeQuantity({ cartItemId, newQuantity: cartQuantity - 1 });
  }, [cartItemId, cartQuantity, changeQuantity]);

  const handleDeleteCart = useCallback(async () => {
    await deleteCart({ cartItemId });
    handleDeleteCheck();
  }, [cartItemId, deleteCart, handleDeleteCheck]);

  const isLoading = isChanging || isDeleting;

  return (
    <div key={cartItemId} css={styles.cartItemFrameCss}>
      <div css={styles.cartItemHeaderCss}>
        <CheckBox onChange={handleCheckBoxChange} checked={checked} />
        <RemoveButton onClick={handleDeleteCart} disabled={isLoading} />
      </div>
      <div css={styles.cartItemInfoCss}>
        <img
          css={styles.cartItemImgCss}
          src={imageUrl || './assets/default.png'}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = './assets/default.png';
          }}
        />
        <div>
          <p>{name}</p>
          <p css={styles.cartItemPriceCss}>{(price * cartQuantity).toLocaleString()}원</p>
          <Stepper value={cartQuantity} onDecrement={handleMinus} onIncrement={handlePlus} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

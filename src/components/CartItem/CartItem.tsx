import * as styles from './CartItem.style';
import Stepper from './Stepper';
import { RemoveButton } from './RemoveButton';
import CheckBox from '../common/CheckBox';
import { CartItemType } from '../../types/cartItem';
import { useCartActions } from '../../hooks/useCartActions';
import { useToast } from '../../hooks/useToast';
import { useEffect } from 'react';

interface CartItemProps {
  item: CartItemType;
  handleCheckBoxChange: () => void;
  checked: boolean;
  handleDeleteCart: () => void;
}

export default function CartItem({ item, handleCheckBoxChange, checked, handleDeleteCart }: CartItemProps) {
  const { id: cartItemId, product, quantity: cartQuantity } = item;
  const { name, price, imageUrl } = product;

  const { updateQuantity, removeItem } = useCartActions();

  const handleMinus = async () => {
    updateQuantity.mutate({ cartItemId, newQuantity: cartQuantity - 1 });
  };

  const handlePlus = async () => {
    updateQuantity.mutate({ cartItemId, newQuantity: cartQuantity + 1 });
  };

  const handleDeleteCartItem = async () => {
    removeItem.mutate({ cartItemId });
    handleDeleteCart();
  };

  const { addToast } = useToast();

  useEffect(() => {
    if (updateQuantity.error) {
      addToast({ message: '수량 변경 중 오류가 발생했습니다.', type: 'error' });
    }
  }, [updateQuantity.error, addToast]);

  useEffect(() => {
    if (removeItem.error) {
      addToast({ message: '상품 삭제 중 오류가 발생했습니다.', type: 'error' });
    }
  }, [removeItem.error, addToast]);

  return (
    <div key={cartItemId} css={styles.cartItemFrameCss}>
      <div css={styles.cartItemHeaderCss}>
        <CheckBox onChange={handleCheckBoxChange} checked={checked} />
        <RemoveButton onClick={handleDeleteCartItem} />
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
          <Stepper value={cartQuantity} onDecrement={handleMinus} onIncrement={handlePlus} />
        </div>
      </div>
    </div>
  );
}

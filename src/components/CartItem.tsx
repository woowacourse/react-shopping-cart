import { css } from '@emotion/react';
import Stepper from './Stepper';
import { RemoveButton } from './RemoveButton';
import CheckBox from './CheckBox';
import { CartItemType } from '../types/cartItem';
import patchCartItem from '../api/patchCartItem';
import { useApiContext } from '../contexts/ApiContext';
import getCartItems from '../api/getCartItem';
import { deleteCartItem } from '../api/deleteCartItem';

interface CartItemProps {
  item: CartItemType;
  handleCheckBoxChange: () => void;
  checked: boolean;
}

export default function CartItem({ item, handleCheckBoxChange, checked }: CartItemProps) {
  const { id: cartItemId, product, quantity: cartQuantity } = item;
  const { name, price, imageUrl } = product;

  const { fetcher: refetchCart } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

  const handleMinus = async () => {
    await patchCartItem(cartItemId, cartQuantity - 1);
    await refetchCart();
  };

  const handlePlus = async () => {
    // if (cartQuantity >= productQuantity) return;
    await patchCartItem(cartItemId, cartQuantity + 1);
    await refetchCart();
  };

  const handleDeleteCart = async () => {
    await deleteCartItem(cartItemId);
    await refetchCart();
  };

  return (
    <div key={cartItemId} css={cartItemFrameCss}>
      <div css={cartItemHeaderCss}>
        <CheckBox onChange={handleCheckBoxChange} checked={checked} />
        <RemoveButton onClick={handleDeleteCart} />
      </div>
      <div css={cartItemInfoCss}>
        <img
          css={cartItemImgCss}
          src={imageUrl || './assets/default.png'}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = './assets/default.png';
          }}
        />
        <div>
          <p>{name}</p>
          <p>{price}</p>
          <Stepper value={cartQuantity} onDecrement={handleMinus} onIncrement={handlePlus} />
        </div>
      </div>
    </div>
  );
}

const cartItemFrameCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderTop: '1px solid #ccc',
  padding: '16px 0'
});

const cartItemHeaderCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
});

const cartItemInfoCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
  marginTop: '8px'
});

const cartItemImgCss = css({
  width: '112px',
  height: '112px',
  borderRadius: '8px',
  objectFit: 'cover'
});

import { css } from '@emotion/react';
import Stepper from './Stepper';
import { RemoveButton } from './RemoveButton';
import CheckBox from './CheckBox';

interface CartItemProps {
  item: CartItem;
  handleCheckBoxChange: () => void;
  checked: boolean;
}

export default function CartItem({ item, handleCheckBoxChange, checked }: CartItemProps) {
  const { id, name, price, imageUrl, quantity } = item;

  return (
    <div key={id} css={cartItemFrameCss}>
      <div css={cartItemHeaderCss}>
        <CheckBox onChange={handleCheckBoxChange} checked={checked} />
        <RemoveButton />
      </div>
      <div css={cartItemInfoCss}>
        <img css={cartItemImgCss} src={imageUrl} alt={name} />
        <div>
          <p>{name}</p>
          <p>{price}</p>
          <Stepper value={quantity} onDecrement={() => {}} onIncrement={() => {}} />
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

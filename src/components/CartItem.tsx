import { css } from '@emotion/react';
import Stepper from './Stepper';
import { RemoveButton } from './RemoveButton';
import CheckBox from './CheckBox';

export default function CartItem({ item }: { item: CartItem }) {
  return (
    <div key={item.id} css={cartItemFrameCss}>
      <div css={cartItemHeaderCss}>
        <CheckBox />
        <RemoveButton />
      </div>
      <div css={cartItemInfoCss}>
        <img css={cartItemImgCss} src={item.imageUrl} alt={item.name} />
        <div>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <Stepper value={item.quantity} onDecrement={() => {}} onIncrement={() => {}} />
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

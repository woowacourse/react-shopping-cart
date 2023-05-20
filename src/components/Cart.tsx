import { styled } from 'styled-components';
import { useCartSizeValue } from '../recoils/recoilCart';
import { CartActions } from './CartActions';
import { CartItemList } from './CartItemList';

export const Cart = () => {
  const cartSize = useCartSizeValue();

  return (
    <Style.Cart>
      <Style.CartHeader>
        <span>든든배송 상품 ({cartSize}개)</span>
        <CartActions />
      </Style.CartHeader>
      <CartItemList />
    </Style.Cart>
  );
};

const Style = {
  Main: styled.div``,

  Cart: styled.div``,

  CartHeader: styled.div`
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 8px 0;
  `,
};

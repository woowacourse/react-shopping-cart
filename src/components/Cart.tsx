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
  Cart: styled.div`
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  `,

  CartHeader: styled.div`
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 8px 0;

    @media screen and (max-width: 500px) {
      width: 100%;

      font-size: 13px;

      & > span {
        display: none;
      }
    }
  `,
};

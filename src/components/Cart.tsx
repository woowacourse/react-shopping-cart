import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { useCartSizeValue } from '../recoils/recoilCart';

import { CartActions } from './CartActions';
import { CartItemList } from './CartItemList';

import { PATH } from '../constants';

export const Cart = () => {
  const cartSize = useCartSizeValue();

  return (
    <Style.Cart>
      <Style.CartHeader>
        <span>든든배송 상품 ({cartSize}개)</span>
        <CartActions />
      </Style.CartHeader>
      {cartSize > 0 ? (
        <CartItemList />
      ) : (
        <Style.NoExistItemsMessage>
          <p>장바구니에 등록된 상품이 존재하지 않아요🥲</p>
          <Link to={PATH.HOME}>상품 보러가기🚀</Link>
        </Style.NoExistItemsMessage>
      )}
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

    @media screen and (min-width: 501px) {
      width: 735px;
    }

    @media screen and (max-width: 500px) {
      width: 100%;

      font-size: 13px;

      & > span {
        display: none;
      }
    }
  `,

  NoExistItemsMessage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 200px;

    color: var(--grey-300);

    & > p {
      font-size: 20px;
      margin-bottom: 30px;

      line-height: 25px;
    }

    & > a {
      color: var(--grey-400);
      border-bottom: 3px solid var(--grey-400);
    }
  `,
};

/* eslint-disable react-hooks/exhaustive-deps */
import { cartState } from '../../store/CartState';
import { useRecoilState } from 'recoil';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../types';
import CartListItem from './CartListItem';
import Checkbox from '../@common/Checkbox';
import TotalCheckbox from './TotalCheckbox';
import PriceWrapper from './PriceWrapper';
import { LoadingSpinner } from '../@common/LoadingSpinner';
import { CART_BASE_URL } from '../../constants/url';
import { styled } from 'styled-components';
import useGet from '../../hooks/useGet';
import { useEffect } from 'react';

const CartList = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const { data, isLoading } = useGet<CartItem[]>(CART_BASE_URL);

  useEffect(() => {
    if (data) setCart(data);
  }, [data]);

  // TODO: error handling

  const {
    checkedItems,
    isChecked,
    setCheckedItems,
    totalPrice,
    handleCheckAllItems,
    handleCheckedItem,
    handleRemoveCheckedItem,
  } = useCart();

  const cartList = cart.map((cartItem) => (
    <S.ItemWrapper key={cartItem.id}>
      <Checkbox onChange={handleCheckedItem(cartItem.id)} isChecked={isChecked(cartItem.id)} />
      <CartListItem item={cartItem} setCheckItems={setCheckedItems} />
    </S.ItemWrapper>
  ));

  const itemList = (
    <S.ItemListWrapper>{isLoading ? <LoadingSpinner /> : cartList}</S.ItemListWrapper>
  );

  return (
    <>
      <S.Title>장바구니</S.Title>
      <S.Wrapper>
        <TotalCheckbox
          cartLength={cart.length}
          checkedItemsCount={checkedItems.length}
          handleCheckAllItems={handleCheckAllItems}
          clickRemoveButton={handleRemoveCheckedItem}
        />
        <S.ContentWrapper>
          {itemList}
          <PriceWrapper totalPrice={totalPrice} />
        </S.ContentWrapper>
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;

    @media all and (max-width: 479px) {
      & > :first-child {
        font-size: 20px;
        margin-top: 30px;
        input {
          width: 24px;
        }

        button {
          width: fit-content;
        }
      }
    }
  `,

  ItemListWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: 700px;
    overflow: scroll;

    & > :first-child {
      margin-top: 60px;
      border-top: 4px solid #aaa;
    }

    & > :last-child {
      border-bottom: none;
    }
    @media all and (max-width: 479px) {
      & > :first-child {
        margin-top: 20px;
      }
    }
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    & > :first-child {
      position: relative;
      left: 20px;
      margin-top: 85px;
      margin-left: 20px;
    }

    & > :nth-child(even) {
      border-bottom: 1.5px solid #ccc;
    }

    @media all and (max-width: 479px) {
      & > :first-child {
        position: relative;
        margin-top: 25px;
        margin-left: 0;
        width: 24px;
      }

      & > :nth-child(2) {
        padding: 20px 20px 60px 20px;
      }
    }
  `,

  ContentWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;

    @media all and (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
    }
  `,

  Title: styled.h1`
    width: 80%;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    padding: 30px;
    border-bottom: 4px solid #333;
    @media all and (max-width: 479px) {
      display: none;
    }
  `,
};
export default CartList;

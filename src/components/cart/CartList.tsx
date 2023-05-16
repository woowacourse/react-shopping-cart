import { useRecoilValue } from 'recoil';
import { cartState } from '../../store/CartState';
import CartListItem from './CartListItem';
import { styled } from 'styled-components';
import { DELIVERY_FEE } from '../../constants';
import { totalPriceSelector } from '../../store/CartSelector';

const CartList = () => {
  const cart = useRecoilValue(cartState);
  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <>
      <S.Title>장바구니</S.Title>
      <S.Wrapper>
        <S.ItemWrapper>
          {cart.map((cartItem) => (
            <CartListItem item={cartItem} />
          ))}
        </S.ItemWrapper>
        <S.PriceWrapper>
          <S.PriceLabel>결제예상금액</S.PriceLabel>
          <S.PriceInfo>
            <p>총 삼품가격</p>
            <p>{totalPrice.toLocaleString()}원</p>
            <p>총 배송비</p>
            <p>{DELIVERY_FEE.toLocaleString()}원</p>
            <p>총 주문금액</p>
            <p>{(totalPrice + DELIVERY_FEE).toLocaleString()}원</p>
          </S.PriceInfo>
          <S.OrderButton>주문하기</S.OrderButton>
        </S.PriceWrapper>
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.h1`
    font-size: 32px;
    font-weight: 700;
  `,

  PriceWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    height: 410px;
    padding: 30px;
    border: 1px solid #ddd;

    & > :nth-child(1) {
      display: flex;
      align-items: flex-start;
    }

    p {
      display: inline-block;
      width: 50%;
      margin: 10px 0px;
    }

    p:nth-child(2n) {
      text-align: right;
    }
  `,

  PriceLabel: styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 400;
  `,
  PriceInfo: styled.div`
    font-size: 20px;
    font-weight: 700;
  `,

  OrderButton: styled.button`
    width: 390px;
    height: 75px;
    font-size: 24px;
    font-weight: 400;
    color: #fff;
    background-color: #333;
    cursor: pointer;
  `,
};
export default CartList;

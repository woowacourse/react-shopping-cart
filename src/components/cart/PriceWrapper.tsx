import { styled } from 'styled-components';
import { DELIVERY_FEE } from '../../constants';

type Props = {
  totalPrice: number;
};

const PriceWrapper = ({ totalPrice }: Props) => {
  return (
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
  );
};

const S = {
  PriceWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    height: 410px;
    margin-top: 40px;
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
    width: 80%;
    height: 75px;
    font-size: 24px;
    font-weight: 400;
    color: #fff;
    background-color: #333;
    cursor: pointer;
  `,
};

export default PriceWrapper;

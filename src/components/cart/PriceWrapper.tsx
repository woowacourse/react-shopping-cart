import { styled } from 'styled-components';
import { DELIVERY_FEE } from '../../constants';

type Props = {
  totalPrice: number;
};

const PriceWrapper = ({ totalPrice }: Props) => {
  const Price = (id: string, description: string, price: string) => (
    <section id={id}>
      <li>{description}</li>
      <p>{price}</p>
    </section>
  );

  return (
    <S.PriceWrapper>
      <S.PriceLabel>결제예상금액</S.PriceLabel>
      <S.PriceInfo>
        {Price('total-product-price', '총 상품가격', `${totalPrice.toLocaleString()}원`)}
        {Price('delivery-fee', '총 배송비', `${DELIVERY_FEE.toLocaleString()}원`)}
        {Price('total-price', '총 주문금액', `${(totalPrice + DELIVERY_FEE).toLocaleString()}원`)}
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
    width: 60%;
    height: 410px;
    margin-top: 40px;
    border: 1px solid #ddd;

    & > :nth-child(1) {
      display: flex;
      align-items: flex-start;
      padding: 20px;
      width: 100%;
      border-bottom: 3px solid #ddd;
    }

    p {
      display: inline-block;
      width: 50%;
      margin: 10px 0px;
    }

    p:nth-child(even) {
      text-align: right;
    }

    @media all and (max-width: 1200px) {
      width: 90%;
    }
  `,

  PriceLabel: styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 400;
  `,
  PriceInfo: styled.div`
    width: 90%;
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;

    & > :nth-child(n) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      li {
        list-style: none;
      }
    }

    & > :last-child {
      margin-top: 30px;
    }
  `,

  OrderButton: styled.button`
    width: calc(100% - 60px);
    height: 75px;
    font-size: 24px;
    font-weight: 400;
    margin-top: 45px;
    color: #fff;
    background-color: #333;
    cursor: pointer;
  `,
};

export default PriceWrapper;

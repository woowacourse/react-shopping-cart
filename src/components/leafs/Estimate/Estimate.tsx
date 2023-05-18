import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SHIPPING_FEE } from '../../../constants';

interface EstimateProps {
  total_price: number;
}

export default function Estimate({ total_price }: EstimateProps) {
  return (
    <Wrapper>
      <Title>결제 예상 금액</Title>
      <InfoBox>
        <Info>
          <p>총 상품가격</p>
          <p>{total_price.toLocaleString()}원</p>
        </Info>
        <Info>
          <p>총 배송비</p>
          <p>{SHIPPING_FEE.toLocaleString()}원</p>
        </Info>
        <Total>
          <p>총 주문금액</p>
          <p>{(total_price + SHIPPING_FEE).toLocaleString()}원</p>
        </Total>
      </InfoBox>
      <Link to="/">
        <OrderButton>주문하기</OrderButton>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 55px;

  border: 1px solid #dddddd;

  margin-top: 55px;

  @media screen and (max-width: 767px) {
    width: 320px;
    height: 360px;

    margin-top: 30px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  padding: 20px;
  border-bottom: 3px solid #dddddd;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 27px;

  font-size: 17px;
  font-weight: 600;

  @media screen and (max-width: 767px) {
    gap: 15px;
  }
`;

const Info = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const Total = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
`;

const OrderButton = styled.button`
  width: 90%;
  height: 73px;

  padding: 13px;
  background-color: black;
  color: white;

  margin: 0px 20px;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    padding: 6px;
    height: 50px;
    font-size: 15px;
  }
`;

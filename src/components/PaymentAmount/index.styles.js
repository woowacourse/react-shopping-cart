import styled from "styled-components";

export const PaymentAmountContainer = styled.section`
  max-width: 448px;
  border: 1px solid #ddd;
`;

export const PaymentAmountTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
  padding: 20px 30px;
  border-bottom: 1px solid #ddd;
`;

export const PaymentAmountControlContainer = styled.div`
  padding: 20px 30px;
`;

export const PaymentAmountInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 34px 0 68px;

  p {
    font-size: 20px;
    line-height: 26.67px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
`;

export const OrderButton = styled.button`
  width: 100%;
  font-size: 20px;
  line-height: 21.33px;
  padding: 26px 120px;
  background-color: #2ac1bc;
  border-radius: 4px;
  color: #fff;
`;

import styled from 'styled-components';

export const PaymentConfirmPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  margin-bottom: 18px;
`;

export const SubTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #0a0d13;
`;

export const TotalPriceLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  color: #0a0d13;
  margin: 27px 0 8px 0;
`;

export const TotalPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
`;

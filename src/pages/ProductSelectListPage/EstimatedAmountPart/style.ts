import styled from 'styled-components';

export const EstimatedAmountPartContainer = styled.div`
  padding: 4% 6%;
  border: 1px solid #dddddd;

  display: grid;
  grid-template-rows: 80px 50px 50px 90px 120px;
  align-items: center;
`;

export const EstimatedAmountTitle = styled.p`
  border-bottom: 1.5px solid #dddddd;

  font-weight: 400;
  font-size: 24px;
  line-height: 33px;

  letter-spacing: 0.5px;

  margin: 0;
  padding: 3% 0;
`;

export const EstimatedAmountTextLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EstimatedAmountText = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;

  letter-spacing: 0.5px;
`;

export const PurchaseButton = styled.button`
  display: block;
  margin: 0 auto;

  width: 388px;
  height: 73px;

  background: #333333;

  font-weight: 400;
  font-size: 24px;
  line-height: 21px;

  color: #ffffff;
`;

import styled from 'styled-components';

export const Container = styled.div`
  align-self: flex-start;
  min-width: 360px;
  border: 1px solid #dddddd;
  color: #333333;
  background-color: #dddddd;
  display: grid;
  row-gap: 2px;
  @media only screen and (max-width: 1200px) {
    // 테블릿
    margin-bottom: 40px;
  }
`;

export const Title = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  background-color: #ffffff;
  padding: 20px 30px;
`;

export const ExpectedAmountLayout = styled.div`
  background-color: #ffffff;
  padding: 20px 30px;
  display: grid;
  row-gap: 20px;
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  :nth-child(3) {
    padding: 10px 0px;
  }
`;

export const AmountCategory = styled.div``;

export const Amount = styled.div``;

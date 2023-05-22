import styled from 'styled-components';

export const StyledPaymentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 68px;
  padding: 28px 16px;

  width: 400px;
  height: 360px;

  border: 0.5px solid #333333;

  & > p {
    padding-bottom: 28px;
    width: 100%;

    border-bottom: 0.5px solid #333333;

    text-align: start;
  }
`;

export const StyledPaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;

  p {
    width: 100%;
    margin: 20px 0;

    text-align: start;
  }

  & > div {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }
`;

import styled from 'styled-components';

export const StyledPaymentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40%;
  height: 100%;
`;

export const StyledPaymentInfoBox = styled.div`
  width: 100%;
  height: 400px;

  margin: 64px;

  border: 0.5px solid #333333;

  & > p {
    padding: 28px 16px;
    width: 100%;

    border-bottom: 0.5px solid #333333;

    text-align: start;

    @media screen and (max-width: 1000px) {
      padding: 16px;
    }
  }

  @media screen and (max-width: 1000px) {
    height: 320px;
  }
`;

export const StyledPaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 320px;

  padding: 0 16px;

  @media screen and (max-width: 1000px) {
    height: 280px;
  }
`;

export const StyledPaymentResult = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

export const StyledFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  width: 100%;

  div {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }
`;

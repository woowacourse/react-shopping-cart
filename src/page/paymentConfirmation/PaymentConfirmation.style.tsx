import styled from "@emotion/styled";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ContentSection = styled.div`
  text-align: center;
  margin-bottom: 16px;

  h1 {
    margin-bottom: 12px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

export const PriceSection = styled.div`
  text-align: center;
`;

export const PriceLabel = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;

export const PriceAmount = styled.p`
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

export const GoBackToHomeButton = styled.button`
  width: 100%;
  max-width: 430px;
  background-color: #000000;
  color: #ffffff;

  bottom: 0;

  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  z-index: 100;

  font-size: 16px;
  font-weight: 700;

  a {
    text-decoration: none;
  }
  transform: translateX(-50%);
  left: 50%;

  &:disabled {
    background-color: rgb(105, 105, 105);
    cursor: not-allowed;
  }
`;

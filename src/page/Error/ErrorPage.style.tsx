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
export const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 300px;
  height: 48px;
  border-radius: 8px;
  background-color: #000000;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #333333;
  }
`;

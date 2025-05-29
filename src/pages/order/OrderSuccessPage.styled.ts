import styled from '@emotion/styled';

export const Container = styled.main`
  margin-top: 36px;
  padding: 0 24px;
  height: calc(100vh - 164px);
`;

export const Title = styled.h1`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;

export const PayConfirmButton = styled.button`
  width: 500px;
  height: 64px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;

  &:disabled {
    background-color: #bebebe;
  }
`;

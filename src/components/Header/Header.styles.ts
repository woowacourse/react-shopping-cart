import styled from '@emotion/styled';

export const Container = styled.header`
  width: 100%;
  height: 64px;
  background-color: #000000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
`;

export const Button = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  background-color: transparent;
  cursor: pointer;
`;

export const BackArrow = styled.img`
  width: 24px;
  height: 24px;
`;

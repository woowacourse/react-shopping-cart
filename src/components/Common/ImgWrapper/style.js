import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: ${({ size }) => (size ? `${size}px` : '60%')};
`;

import styled from 'styled-components';

export const Container = styled.span`
  position: relative;
  display: flex;
  width: auto;
`;

export const Text = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #333333;
  z-index: 1;
`;

export const UnderLine = styled.span`
  position: absolute;
  bottom: 0.125rem;
  left: -5%;
  width: 110%;
  height: 0.5rem;
  background-color: rgba(42, 194, 188, 0.5);
`;

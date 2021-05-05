import styled from 'styled-components';

const SIZE = {
  small: '120px',
  medium: '144px',
  large: '282px',
  'x-large': '570px',
};

export const Container = styled.img`
  width: ${({ size }) => SIZE[size]};
  height: ${({ size }) => SIZE[size]};
  display: block;
  object-fit: cover;
`;

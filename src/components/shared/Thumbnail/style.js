import styled from 'styled-components';

const SIZE = {
  small: '120px',
  medium: '144px',
  large: '282px',
  'x-large': '570px',
};

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: ${({ size }) => SIZE[size]};
  height: ${({ size }) => SIZE[size]};
  overflow: hidden;
`;

export const Image = styled.img`
  display: block;
  width: inherit;
  height: inherit;
  transition: transform 0.5s ease;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

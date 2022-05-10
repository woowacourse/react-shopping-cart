import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

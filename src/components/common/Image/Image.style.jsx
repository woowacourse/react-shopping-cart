import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;

  transition: all 0.5s;
`;

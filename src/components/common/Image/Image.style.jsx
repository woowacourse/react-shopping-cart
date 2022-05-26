import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: ${({ width }) => width};
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colorConfig.skeleton};

  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;

  transition: transform 0.5s;
`;

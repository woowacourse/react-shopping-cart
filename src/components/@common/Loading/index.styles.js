import styled from 'styled-components';

export const ImageWrapper = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
  border-radius: 1rem;
  top: calc(50% - 7rem);
  left: calc(50% - 7rem);
  background: var(--color-white);
  animation: gelatine 1s infinite;
  user-select: none;
`;

export const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: contain;
  position: absolute;
  padding: 1rem;
  top: 1.5rem;
  user-select: none;
`;

export const LoadingDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000094;
  z-index: 99;
  backdrop-filter: blur(3px);
  user-select: none;
`;

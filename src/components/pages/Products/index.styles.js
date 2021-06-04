import styled from 'styled-components';

export const Loading = styled.div`
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

export const ProductPage = styled.main`
  max-width: 57rem;
  margin: 7rem auto;
  user-select: none;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem 3rem;
  justify-items: center;
  margin: 0 auto;

  & > li {
    width: 12rem;
  }

  @media (max-width: 960px) {
    max-width: 42rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    max-width: 27rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 568px) {
    max-width: 15rem;
    grid-template-columns: repeat(1, 1fr);
  }
`;

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

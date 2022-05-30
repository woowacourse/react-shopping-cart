import styled from 'styled-components';

export const OutOfStockOverlay = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { colors } }) => colors.white};
  font-size: 2rem;
  font-weight: 700;
`;

export const CardImageOverlay = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};

  background: rgba(0, 0, 0, 0.3);

  p {
    inset: 30px 30px 60px;
    color: white;
    position: absolute;

    line-height: 1.4rem;

    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
  }

  div {
    position: absolute;
    bottom: 0px;
    right: 0px;
    font-size: 24px;
    color: white;
    padding: 10px;
    background: ${({ theme: { colors } }) => colors.black};
  }
`;

export const CardImageBox = styled.div`
  grid-column: 1 / 5;
  grid-row: 1 / 5;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  position: relative;

  img {
    width: 100%;
  }
`;

export const CardDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  grid-column: 1 / 4;
  grid-row: 5;
  font-weight: 400;

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
  }

  p {
    font-size: 20px;
  }
`;

export const CardButtonBox = styled.div`
  grid-column: 4;
  grid-row: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;

  button {
    color: inherit;
    background: none;
    width: 30px;
    height: 27px;
  }
`;

export const ProductCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: repeat(5, 1fr);
  grid-gap: 10px;
  width: 282px;
  color: ${({ theme: { colors } }) => colors.black};

  :not(:hover) {
    ${CardImageBox} {
      ${CardImageOverlay} {
        opacity: 0;
        transition-duration: 0.3s;
      }

      img {
        transform: scale(1, 1);
        transition-duration: 0.3s;
      }
    }
  }

  :hover {
    ${CardImageBox} {
      ${CardImageOverlay} {
        opacity: 1;
        transition-duration: 0.3s;
      }

      img {
        transform: scale(1.05, 1.05);
        transition-duration: 0.3s;
      }
    }

    ${CardDescriptionBox} > h3 {
      text-decoration: underline;
    }
  }
`;

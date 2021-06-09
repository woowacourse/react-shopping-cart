import styled from 'styled-components';

import PALETTE from '../../../constants/palette';

export const Container = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    height: 35rem;
    background-color: ${PALETTE.BLACK_TRANSPARENT_005};
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 36rem;
  padding-top: 100%;
  overflow: hidden;
  background-color: ${PALETTE.GRAY_007};

  img {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const ProductName = styled.h2`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 4rem;
  padding: 1.5rem 1rem;
  border-width: 0 0 4px 0;
  border-style: solid;
  border-color: ${PALETTE.GRAY_001};
`;

export const PriceText = styled.p`
  font-size: 1.2rem;
`;

export const ProductPrice = styled.p`
  font-size: 1.5rem;
`;

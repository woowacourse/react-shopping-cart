import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';

import { COLORS, LAYOUT } from 'styles/theme';

const Container = styled.div`
  ${({ direction }) =>
    (direction === 'horizontal' &&
      css`
        display: flex;
        width: 100%;
        flex-direction: row;
      `) ||
    (direction === 'vertical' &&
      css`
        margin-bottom: 2rem;
      `)}
`;

const ImageContainer = styled.div`
  cursor: pointer;

  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  ${({ fill }) =>
    fill
      ? css`
          width: 100%;
        `
      : css`
          width: 25%;
        `};
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;

  left: 0px;
  top: 0px;
  object-fit: cover;
  transition: transform 0.3s ease;

  filter: brightness(0.95);

  ${ImageContainer}:hover & {
    transform: scale(110%);
  }
`;

const CartController = styled.div`
  position: absolute;
  width: 90%;

  left: 5%;
  bottom: 0%;

  background-color: ${COLORS.WHITE};
  opacity: 0;
  border-radius: ${LAYOUT.BORDER_RADIUS * 3}px;

  transition: opacity 0.2s ease, bottom 0.2s ease;

  ${ImageContainer}:hover > & {
    bottom: 5%;
    opacity: 1;
  }
`;

const ControlButton = styled.button`
  padding: 0.3rem;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemInfo = styled.div`
  ${({ direction }) =>
    direction === 'horizontal'
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 75%;
          padding: 1rem 1.5rem;
        `
      : css`
          width: 80%;
          padding: 0.6rem 0;
        `}

  & > p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.5rem 0;
`;

const Price = styled.p`
  font-size: 1.1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 20%;
`;

export {
  Container,
  ImageContainer,
  Image,
  Description,
  ItemInfo,
  Title,
  Price,
  ButtonContainer,
  CartController,
  ControlButton,
};

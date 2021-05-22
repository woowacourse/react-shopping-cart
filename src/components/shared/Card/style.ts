import styled, { css } from 'styled-components';
import { CardType } from './.';

interface CardContainerProps {
  type: CardType;
  width?: string;
  height?: string;
}

const verticalTypeStyle = css<CardContainerProps>`
  flex-direction: column;

  & > img {
    width: 100%;
    height: 100%;
    margin-bottom: 1.25rem;
    max-width: 100%;
    object-fit: contain;
    overflow: hidden;
  }
`;

const horizontalTypeStyle = css<CardContainerProps>`
  flex-direction: row;
  height: ${({ height }) => height};
  width: ${({ width }) => width};

  & > img {
    height: 100%;
    width: ${({ height }) => height};
    max-height: ${({ height }) => height};
    margin-right: 1.25rem;
  }
`;

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  box-sizing: border-box;
  ${({ type }) => (type === 'vertical' ? verticalTypeStyle : horizontalTypeStyle)}
`;

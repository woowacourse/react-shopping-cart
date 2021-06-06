import styled, { css } from 'styled-components';
import { CardType } from './.';

interface CardContainerProps {
  type: CardType;
  width?: string;
  height?: string;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  box-sizing: border-box;
  ${({ type }) => (type === 'vertical' ? verticalTypeStyle : horizontalTypeStyle)}
`;

const verticalTypeStyle = css<CardContainerProps>`
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  & > img {
    width: 100%;
    height: ${({ width }) => width};
    margin-bottom: 1.25rem;
  }
`;

const horizontalTypeStyle = css<CardContainerProps>`
  flex-direction: row;
  height: ${({ height }) => height};
  width: ${({ width }) => width};

  & > img {
    height: 100%;
    width: ${({ height }) => height};
    margin-right: 1.25rem;
  }
`;

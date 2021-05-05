import styled, { css } from 'styled-components';
import { CardType } from './.';

interface CardContainerProps {
  type: CardType;
  width: string;
  height: string;
}

const verticalTypeStyle = css<CardContainerProps>`
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  & > img {
    height: ${({ width }) => width};
    width: ${({ width }) => width};
    margin-bottom: 1.25rem;
  }
`;

const horizontalTypeStyle = css<CardContainerProps>`
  flex-direction: row;
  height: ${({ height }) => height};
  width: ${({ width }) => width};

  & > img {
    height: ${({ height }) => height};
    width: ${({ height }) => height};
    margin-right: 1.25rem;
  }
`;

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  ${({ type }) => (type === 'vertical' ? verticalTypeStyle : horizontalTypeStyle)}
`;

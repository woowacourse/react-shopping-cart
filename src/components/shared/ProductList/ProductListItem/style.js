import styled, { css } from 'styled-components';

import PALETTE from '../../../../constants/palette';

const LIST_STYLE = {
  lineStyle: css`
    padding: 1.5rem 0;

    border-top: 1.5px solid ${PALETTE.GRAY_004};

    &:first-child {
      border-top: 4px solid ${PALETTE.GRAY_001};
    }
  `,
  tableStyle: css`
    padding: 1.75rem 1.5rem;
    border: 1px solid ${PALETTE.GRAY_001};
    background-color: ${PALETTE.WHITE};

    &:not(:first-child) {
      border-top: none;
    }
  `,
};

export const ProductListItem = styled.li`
  display: flex;
  justify-content: space-between;

  ${({ listStyle }) => LIST_STYLE[listStyle]}
`;

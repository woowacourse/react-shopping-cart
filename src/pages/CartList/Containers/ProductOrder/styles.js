import styled from '@emotion/styled/macro';

import FlexContainer from 'components/@common/FlexContainer';

import { COLORS } from 'styles/theme';

const OrderContainer = styled.div`
  display: flex;
  position: sticky;
  top: 3.125rem;

  flex-direction: column;
  border: 1px solid ${COLORS.GRAY_150};

  ${FlexContainer} {
    padding: 1.5rem;
    font-weight: bold;
  }
`;

export { OrderContainer };

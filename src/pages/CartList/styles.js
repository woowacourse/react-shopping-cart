import styled from '@emotion/styled/macro';

import FlexContainer from 'components/@common/FlexContainer';

import { COLORS } from 'styles/theme';

const Container = styled.div`
  display: grid;
  grid-template-columns: 58% 40%;
  gap: 2%;

  & > ${FlexContainer} {
    padding: 1rem 1.5rem;
  }
`;

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 0.875rem;
  color: ${COLORS.GRAY_30};
`;

const OrderContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;

  flex-direction: column;
  border: 1px solid ${COLORS.GRAY_150};

  ${FlexContainer} {
    padding: 1.5rem;
    font-weight: bold;
  }
`;

export { Container, ControllerContainer, OrderContainer };

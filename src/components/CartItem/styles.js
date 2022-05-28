import styled from '@emotion/styled/macro';

import { COLORS } from 'styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;

  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${COLORS.GRAY_150};
`;

export { Container };

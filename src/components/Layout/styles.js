import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1080px;
  background-color: ${COLORS.WHITE};

  & > main {
    padding: 0;
  }
`;

export { Container };

import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const Container = styled.footer`
  font-size: 0.8rem;
  padding: 3rem;
  border-top: 1px solid ${COLORS.GRAY_003};
  color: ${COLORS.GRAY_004};
  text-align: center;

  & > b {
    color: ${COLORS.GRAY_004};
  }
`;

export { Container };

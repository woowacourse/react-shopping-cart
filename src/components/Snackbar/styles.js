import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const Wrapper = styled.div`
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 1;
  min-width: 360px;
  padding: 1.5rem;
  border-radius: 5px;
  background-color: ${COLORS.GRAY_500};
  opacity: 80%;
  color: ${COLORS.WHITE};
  text-align: center;
  font-size: 0.8rem;
`;

export { Wrapper };

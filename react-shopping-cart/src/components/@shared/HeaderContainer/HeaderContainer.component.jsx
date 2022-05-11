import styled from 'styled-components';
import { LAYER } from 'constants';
import theme from 'styles/theme';

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 300px;
  background-color: ${({ theme }) => theme.colors.main};
  box-shadow: 0 4px 4px ${({ theme }) => theme.colors.shadow};
  z-index: ${LAYER.FOREGROUND};
`;

export default HeaderContainer;

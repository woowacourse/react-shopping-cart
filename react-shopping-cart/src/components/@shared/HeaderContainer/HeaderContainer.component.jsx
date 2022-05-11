import styled from 'styled-components';
import { LAYER } from 'constants';
import theme from 'styles/theme';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 1350px;
  height: 80px;
  padding: 0 300px;
  background-color: ${({ theme }) => theme.usingColor.headerBackground};
  box-shadow: 0 4px 4px ${({ theme }) => theme.usingColor.shadow};
  z-index: ${LAYER.FOREGROUND};
`;

export default HeaderContainer;

import styled from 'styled-components';
import { LAYER } from 'constants';
import theme from 'styles/theme';
import FlexBox from '../FlexBox/FlexBox.component';

const HeaderContainer = styled(FlexBox).attrs(props => ({
  justifyContent: 'space-between',
  alignItems: 'center',
}))`
  position: sticky;
  top: 0;
  width: 100%;
  min-width: 1350px;
  height: 80px;
  padding: 0 300px;
  background-color: ${({ theme }) => theme.usingColor.headerBackground};
  box-shadow: 0 4px 4px ${({ theme }) => theme.usingColor.shadow};
  z-index: ${LAYER.FOREGROUND};
`;

export default HeaderContainer;

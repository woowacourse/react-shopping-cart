import styled from '@emotion/styled';
import { ROUTE } from '../../constants';

const ScreenContainer = styled.div`
  background-color: ${props => (props.router === ROUTE.ORDER_LIST ? 'rgba(229, 229, 229, 0.3)' : 'transparent')};
  height: 100vh;
  padding: 60px 20%;
`;

export default ScreenContainer;

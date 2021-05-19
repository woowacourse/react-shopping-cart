import styled from '@emotion/styled';
import { ROUTE } from '../../constants';

const ScreenContainer = styled.div`
  background-color: ${props => (props.route === ROUTE.ORDER_LIST ? 'rgba(229, 229, 229, 0.9)' : 'transparent')};
  min-height: 100vh;
  padding: 60px 20%;

  @media screen and (max-width: 376px) {
    padding: 60px 0;
  }
`;

export default ScreenContainer;

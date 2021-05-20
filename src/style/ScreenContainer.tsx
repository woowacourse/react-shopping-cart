import styled from '@emotion/styled';
import { ROUTE } from '../constant';

interface ScreenContainerProps {
  route: string;
}

const ScreenContainer = styled.div`
  background-color: ${({ route }: ScreenContainerProps) =>
    route === ROUTE.ORDER_LIST ? 'rgba(229, 229, 229, 0.9)' : 'transparent'};
  min-height: 100vh;
  padding: 60px 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ScreenContainer;

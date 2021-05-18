import styled from 'styled-components';
import { LAYOUT } from '../../../constants';

export const Container = styled.div`
  padding-top: ${LAYOUT.NAVBAR_HEIGHT};
  width: 100vw;
  min-height: calc(100vh - ${LAYOUT.NAVBAR_HEIGHT});
  display: flex;
  justify-content: center;
`;

export const Viewport = styled.div`
  width: ${LAYOUT.MAIN_WIDTH};
`;

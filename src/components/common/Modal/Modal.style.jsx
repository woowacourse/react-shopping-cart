import styled from 'styled-components';
import { color } from '../../../styles/Theme';

export const Root = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;
  background-color: white;
  padding: 50px;
  border-radius: 4px;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  background-color: ${color.BLACK_TRANSPARENT};
`;

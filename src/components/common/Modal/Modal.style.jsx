import styled from 'styled-components';
import { color } from '../../../styles/Theme';

export const Dimmed = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${color.BLACK}99;
`;

export const Container = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 4px;
`;

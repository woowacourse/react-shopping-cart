import styled from 'styled-components';
import Colors from '../../../constants/Colors';

export const ContainerDiv = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-direction: column-reverse;
`;

export const OpenButton = styled.button`
  width: 50px;
  height: 50px;

  background-color: ${Colors.PRIMARY_COLOR_DARK};
  color: ${Colors.FONT_WHITE};
  font-size: 0.5rem;
`;

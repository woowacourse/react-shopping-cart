import styled from 'styled-components';
import Colors from '../../../constants/Colors';

export const ContainerDiv = styled.div<{ open: boolean }>`
  z-index: 1;

  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;
  padding: 10px;
  width: 310px;

  background-color: ${Colors.PRIMARY_COLOR_DARK};
  color: ${Colors.FONT_WHITE};
`;

export const ToggleButton = styled.button`
  width: 230px;
  border: 1px solid ${Colors.FONT_WHITE};
  border-radius: 5px;
  font-size: large;
  color: ${Colors.FONT_WHITE};
`;

export const RangeLabel = styled.label<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;
`;

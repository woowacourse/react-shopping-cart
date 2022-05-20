import styled from '@emotion/styled';

import { COLORS } from 'styles/theme';
import Button from '../Button/styles';

const IconButtonStyle = styled(Button)`
  width: unset;
  height: unset;
  margin: unset;
  background-color: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: ${COLORS.BLACK};
  font-size: unset;
  border-radius: 5px;
  padding: 0.35rem;

  &::before {
    content: '\\${({ icon }) => icon}';
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;
  }

  &:hover {
    color: ${COLORS.BLUE_100};
    background-color: ${COLORS.GRAY_200};
  }
`;

export default IconButtonStyle;

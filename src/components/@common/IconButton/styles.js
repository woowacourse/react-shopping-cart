import styled from '@emotion/styled';

import { COLORS } from 'styles/theme';

const IconButtonStyle = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;
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

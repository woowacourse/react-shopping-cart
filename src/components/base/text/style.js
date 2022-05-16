import styled, { css } from 'styled-components';
import { color } from 'constants/constants';

const StyledText = styled.p`
  ${({ modal }) =>
    modal &&
    css`
      font-weight: 500;
      font-size: 25px;
      color: ${color.mint};
    `}
`;

export default StyledText;

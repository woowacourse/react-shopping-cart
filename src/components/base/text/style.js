import styled, { css } from 'styled-components';

const StyledText = styled.p`
  ${({ modal }) =>
    modal &&
    css`
      font-weight: 500;
      font-size: 25px;
      color: var(--primary-color);
    `}
`;

export default StyledText;

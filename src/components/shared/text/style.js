import styled, { css } from 'styled-components';

const Styled = {
  Text: styled.p`
    ${({ modal }) =>
      modal &&
      css`
        font-weight: 500;
        font-size: 25px;
        color: var(--primary-color);
      `}
  `,
};

export default Styled;

import styled, { css } from 'styled-components';

const Styled = {
  Text: styled.p`
    ${({ modal }) =>
      modal &&
      css`
        font-weight: 500;
        font-size: 25px;
        color: ${({ theme }) => theme.colors.mint};
      `}
  `,
};

export default Styled;

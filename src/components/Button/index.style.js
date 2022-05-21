import styled, { css } from 'styled-components';

const Styled = {
  Button: styled.button`
    width: ${({ width }) => width || 'fit-content'};
    height: ${({ height }) => height || 'fit-content'};
    text-align: center;
    padding: 10px;
    background-color: ${({ bg }) => bg || 'transparent'};
    border: ${({ border }) => border || 'none'};
    cursor: pointer;
    color: ${({ theme, color }) => color || theme.colors.white};

    ${({ boldFont }) =>
      boldFont &&
      css`
        font-weight: 900;
        font-size: 40px;
        line-height: 58px;
      `}

    ${({ normalFont }) =>
      normalFont &&
      css`
        font-weight: 500;
        font-size: 24px;
        line-height: 12px;
      `}
  `,
};

export default Styled;

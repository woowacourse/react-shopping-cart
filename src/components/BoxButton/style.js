import styled from 'styled-components';

const BoxButtonStyled = styled.button(
  ({ fontSize, fontWeight, theme, width, height }) => `
    background: ${theme.mainColor};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    color: #FFF;
    width: ${width};
    height: ${height};
    border: none;
    border-radius: 10px;
  `,
);

export default BoxButtonStyled;

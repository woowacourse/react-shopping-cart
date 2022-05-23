import styled from 'styled-components';

const BoxButtonStyled = styled.button(
  ({ color, fontSize, fontColor, width, height, border }) => `
    background: ${color};
    font-size: ${fontSize};
    color: ${fontColor};
    width: ${width};
    height: ${height};
    border: ${border ? `1px solid ${border}` : 'none'};
    cursor: pointer;
  `,
);

export default BoxButtonStyled;

import styled from 'styled-components';

const BoxButtonStyled = styled.button(
  ({ color, fontSize, width, height }) => `
    background: ${color};
    font-size: ${fontSize};
    color: black;
    width: ${width};
    height: ${height};
    border-radius: 10px;
    border: none;
  `,
);

export default BoxButtonStyled;

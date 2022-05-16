import styled from 'styled-components';

const ButtonStyled = styled.button(
  ({ width, height, fontSize, fontWeight, color, border, theme }) => `
  margin: 0;
  cursor: pointer;
  background: none;
  width: ${width};
  height: ${height};
  font-size: ${fontSize || 24};
  font-weight: ${fontWeight || 500};
  color: ${theme[color]};
  border: ${border};
`,
);

export default ButtonStyled;

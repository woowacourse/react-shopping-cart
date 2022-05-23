import styled from 'styled-components';

const ButtonStyled = styled.button(
  ({
    width,
    height,
    minWidth,
    fontSize = '24px',
    fontWeight = '500',
    color,
    border = 'none',
    background = 'none',
    theme,
  }) => `
  margin: 0;
  cursor: pointer;
  width: ${width};
  height: ${height};
  min-width: ${minWidth};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  color: ${theme[color]};
  border: ${border};
  background: ${background};
`,
);

export default ButtonStyled;

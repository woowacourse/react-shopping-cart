import styled from 'styled-components';

const InputStyled = styled.input(
  ({ type, width, height, border, background = 'none', fontSize, checked }) => `
  type: ${type};
  width: ${width};
  height: ${height};
  border: ${border};
  background: ${background};
  font-size: ${fontSize};
  ${checked && 'checked'}
`,
);

export default InputStyled;

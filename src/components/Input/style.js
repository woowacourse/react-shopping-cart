import styled from 'styled-components';

const InputStyled = styled.input(
  ({
    type = 'checkbox',
    width = '28px',
    height = '28px',
    border = '1px solid #22A6A2',
    background = 'none',
  }) => `
  type= ${type};
  width: ${width};
  height: ${height};
  border: ${border};
  background: ${background};
`,
);

export default InputStyled;

import styled from 'styled-components';

const SubTitleStyled = styled.h3(
  ({
    width = '38vw',
    minWidth = '400px',
    textAlign = 'start',
    fontSize = '1rem',
    borderBottom = '1px solid black',
    paddingLeft = '0',
  }) => `
  padding-bottom: 10px;
  width: ${width};
  min-width: ${minWidth};
  text-align: ${textAlign};
  font-size: ${fontSize};
  border-bottom: ${borderBottom};
  padding-left: ${paddingLeft};
`,
);

export default SubTitleStyled;

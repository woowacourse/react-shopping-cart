import styled from 'styled-components';

const SubTitleStyled = styled.h3(
  ({
    width = '38vw',
    textAlign = 'start',
    fontSize = '1rem',
    borderBottom = '1px solid black',
    paddingLeft = '0',
  }) => `
  padding-bottom: 10px;
  width: ${width};
  text-align: ${textAlign};
  font-size: ${fontSize};
  border-bottom: ${borderBottom};
  padding-left: ${paddingLeft};
`,
);

export default SubTitleStyled;

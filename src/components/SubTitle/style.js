import styled from 'styled-components';

const SubTitleStyled = styled.h3(
  ({
    width = '38vw',
    textAlign = 'start',
    fontSize = '1rem',
    borderBottom = '1px solid black',
  }) => `
  width: ${width};
  text-align: ${textAlign};
  padding-bottom: 10px;
  font-size: ${fontSize};
  border-bottom: ${borderBottom};
`,
);

export default SubTitleStyled;

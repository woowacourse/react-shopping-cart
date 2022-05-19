import styled from 'styled-components';

const TitleStyled = styled.h1(
  ({
    width = '68vw',
    textAlign = 'center',
    fontSize = '2rem',
    borderBottom = '3px solid black',
  }) => `
  width: ${width};
  text-align: ${textAlign};
  padding-bottom: 10px;
  font-size: ${fontSize};
  border-bottom: ${borderBottom};
`,
);

export default TitleStyled;

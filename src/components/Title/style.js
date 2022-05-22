import styled from 'styled-components';

const TitleStyled = styled.h1(
  ({
    width = '68vw',
    minWidth = '780px',
    textAlign = 'center',
    fontSize = '2rem',
    borderBottom = '3px solid black',
  }) => `
  width: ${width};
  min-width: ${minWidth};
  text-align: ${textAlign};
  padding-bottom: 10px;
  font-size: ${fontSize};
  border-bottom: ${borderBottom};
`,
);

export default TitleStyled;

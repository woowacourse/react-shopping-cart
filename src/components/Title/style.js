import styled from 'styled-components';

const TitleStyled = styled.h1(
  ({ width, textAlign, fontSize, borderBottom, theme }) => `
  width: ${width};
  text-align: ${textAlign};
  padding-bottom: 10px;
  font-size: ${fontSize};
  border-bottom: ${borderBottom};
`,
);

export default TitleStyled;

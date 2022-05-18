import styled from 'styled-components';

const TitleStyled = styled.h1(
  ({ theme }) => `
  width: 68vw;
  text-align: center;
  padding-bottom: 30px;
  font-size: 2rem;
  border-bottom: 3px solid ${theme.blackColor};
`,
);

export default TitleStyled;

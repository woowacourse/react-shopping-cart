import styled from 'styled-components';

export const HeaderStyled = styled.div(
  ({ theme }) => `
  height: 80px;
  padding: 0 15.625vw;
  background-color: ${theme.headerBackgroundColor};
`,
);

export const PageButtonContainerStyled = styled.div(
  () => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`,
);

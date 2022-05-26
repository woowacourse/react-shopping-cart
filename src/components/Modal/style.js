import styled from 'styled-components';

export const ModalStyled = styled.div(
  ({ theme }) => `
  width: 300px;
  height: 178px;
  padding: 20px;
  border: none;
  box-shadow 8px 8px 40px rgba(0, 0, 0, 0.6);
  position: fixed;
  top: calc(50% - 178px);
  left: calc(50% - 150px);
  background-color: ${theme.whiteColor};
`,
);

export const ModalDimmerStyled = styled.div(
  () => `
  width: 100vw;
  height: ${Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  )}px;
  position: fixed;
  top: 0;
  
  `,
);

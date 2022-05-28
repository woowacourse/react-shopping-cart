import styled from 'styled-components';

const MessageWrapperStyled = styled.div(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - ${theme.headerHeight});
`,
);

export default MessageWrapperStyled;

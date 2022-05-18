import styled from 'styled-components';

const FlexWrapperStyled = styled.div(
  ({ alignItems, justifyContent }) => `
  align-items: ${alignItems};
  justify-content: ${justifyContent};
  display: flex;
`,
);

export default FlexWrapperStyled;

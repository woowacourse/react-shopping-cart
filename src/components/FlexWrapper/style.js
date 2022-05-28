import styled from 'styled-components';

const FlexWrapperStyled = styled.div(
  ({ flexDirection, alignItems, justifyContent }) => `
  flex-direction: ${flexDirection || 'row'};
  align-items: ${alignItems};
  justify-content: ${justifyContent};
  display: flex;
`,
);

export default FlexWrapperStyled;

import styled from 'styled-components';

const MarginWrapperStyled = styled.div(
  ({ marginRight, marginBottom, marginTop }) => `
    margin-right: ${marginRight ? marginRight : 0};
    margin-bottom: ${marginBottom ? marginBottom : 0};
    margin-top: ${marginTop ? marginTop : 0};
  `,
);

export default MarginWrapperStyled;

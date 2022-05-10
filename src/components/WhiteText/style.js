import styled from 'styled-components';

const WhiteTextStyled = styled.p(
  ({ fontSize, fontWeight }) => `
  margin: 0; 
  font-size: ${fontSize || 24}px;
  font-weight: ${fontWeight || 500};
  color: #FFFFFF;
`,
);

export default WhiteTextStyled;

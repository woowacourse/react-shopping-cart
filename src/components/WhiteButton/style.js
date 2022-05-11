import styled from 'styled-components';

const WhiteButtonStyled = styled.p(
  ({ fontSize, fontWeight }) => `
  cursor: pointer;
  font-size: ${fontSize || 24}px;
  font-weight: ${fontWeight || 500};
  color: #FFFFFF;
  border: none;
`,
);

export default WhiteButtonStyled;

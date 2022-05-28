import styled from 'styled-components';

const WhiteButtonStyled = styled.button(
  ({ fontSize, fontWeight }) => `
  margin: 0;
  cursor: pointer;
  font-size: ${fontSize || 24};
  font-weight: ${fontWeight || 500};
  color: #FFF;
  border: none;
  background: none;
`,
);

export default WhiteButtonStyled;

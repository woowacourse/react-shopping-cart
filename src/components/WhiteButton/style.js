import styled from 'styled-components';

const WhiteButtonStyled = styled.button(
  ({ fontSize, fontWeight }) => `
  margin: 0;
  cursor: pointer;
  font-size: ${fontSize || 24};
  font-weight: ${fontWeight || 500};
  color: #FFFFFF;
  border: none;
`,
);

export default WhiteButtonStyled;

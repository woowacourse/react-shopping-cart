import styled from 'styled-components';

const BlackTextStyled = styled.div(
  ({ fontSize, fontWeight, theme, textAlign }) => `
  margin: 0;
  font-size: ${fontSize || '1rem'};
  font-weight: ${fontWeight || 500};
  color: ${theme.blackFontColor};
  text-align: ${textAlign};
`,
);

export default BlackTextStyled;

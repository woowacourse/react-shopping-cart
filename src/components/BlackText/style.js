import styled from 'styled-components';

const BlackTextStyled = styled.p(
  ({ fontSize, fontWeight, theme }) => `
  margin: 0;
  font-size: ${fontSize || '1rem'};
  font-weight: ${fontWeight || 500};
  color: ${theme.blackFontColor};
`,
);

export default BlackTextStyled;

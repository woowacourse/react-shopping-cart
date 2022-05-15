import styled from 'styled-components';

const TextStyled = styled.p(
  ({ color, fontSize, fontWeight, theme }) => `
  margin: 0;
  font-size: ${fontSize || '1rem'};
  font-weight: ${fontWeight || 500};
  color: ${color};
`,
);

export default TextStyled;

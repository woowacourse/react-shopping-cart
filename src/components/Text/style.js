import styled from 'styled-components';

const TextStyled = styled.p(
  ({ color, fontSize, fontWeight, cursor }) => `
  margin: 0;
  font-size: ${fontSize || '1rem'};
  font-weight: ${fontWeight || 500};
  color: ${color};
  cursor: ${cursor};
`,
);

export default TextStyled;

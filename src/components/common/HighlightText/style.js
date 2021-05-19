import styled from 'styled-components';

export const HighlightText = styled.span`
  font-weight: 600;
  ${({ fontSize }) => `font-size: ${fontSize};`}
  ${({ margin }) => `margin: ${margin};`}
  box-shadow: inset 0 -0.4rem 0 0 ${({ highlightColor }) => highlightColor};
`;

import styled, { css } from 'styled-components';

const BorderBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors['GRAY_001']};
  ${({ width, height, textAlign, lineHeight, fontSize, cursor, padding }) =>
    css`
      width: ${width};
      height: ${height};
      text-align: ${textAlign};
      line-height: ${lineHeight};
      font-size: ${fontSize};
      cursor: ${cursor};
      padding: ${padding};
    `}
`;

export default BorderBox;

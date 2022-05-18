import styled, { css } from 'styled-components';

const BorderBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors['GRAY_001']};
  padding: 10px;
  ${({ width, height, textAlign, lineHeight, fontSize }) =>
    css`
      width: ${width};
      height: ${height};
      text-align: ${textAlign};
      line-height: ${lineHeight};
      font-size: ${fontSize};
    `}
`;

export default BorderBox;

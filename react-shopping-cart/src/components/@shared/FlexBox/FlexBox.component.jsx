import styled, { css } from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  ${({ direction, gap, justifyContent, alignItems, width, height }) =>
    css`
      flex-direction: ${direction};
      gap: ${gap};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      width: ${width};
      height: ${height};
    `}
`;

export default FlexBox;

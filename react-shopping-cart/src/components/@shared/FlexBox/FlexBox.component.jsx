import styled, { css } from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  ${({ direction, gap, justifyContent, alignItems }) =>
    css`
      flex-direction: ${direction};
      gap: ${gap};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
    `}
`;

export default FlexBox;

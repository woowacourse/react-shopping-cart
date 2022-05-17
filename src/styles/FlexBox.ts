import styled, { css } from "styled-components";

const FlexBox = styled.div<{
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
}>`
  ${({ flexDirection = "row", justifyContent = "normal", alignItems = "normal" }) =>
    css`
      display: flex;
      flex-direction: ${flexDirection};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
    `}
`;

export default FlexBox;

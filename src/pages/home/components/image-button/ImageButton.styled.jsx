import styled from "@emotion/styled";
import { colors } from "../../../../styled";

const StyledImageButton = styled.button`
  &:disabled {
    svg {
      fill: ${colors.red[1]};
    }
  }
`;

export default StyledImageButton;

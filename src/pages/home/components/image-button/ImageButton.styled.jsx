import styled from "@emotion/styled";
import { noneStyles } from "@/styled";

const StyledImageButton = styled.button`
  ${noneStyles.button}
  width: 50px;
  padding-right: 12px;

  &:hover {
    svg {
      path {
        fill: #03cf5b;
      }
    }
  }
`;

export default StyledImageButton;

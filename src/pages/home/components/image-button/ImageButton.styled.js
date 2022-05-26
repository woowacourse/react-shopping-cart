import styled from "@emotion/styled";
import { noneStyles } from "@/styles/styleUtil";

const StyledImageButton = styled.button`
  ${noneStyles.button}
  width: 50px;
  padding-right: 12px;

  &:hover {
    svg {
      path {
        fill: ${(props) => props.theme.colors.green};
      }
    }
  }
`;

export default StyledImageButton;

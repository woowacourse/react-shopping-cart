import styled from "@emotion/styled";
import { colors, noneStyles } from "@/styled";

const StyledMenu = styled.div`
  display: inline-flex;
  ul {
    ${noneStyles.ul}

    display: flex;
    align-items: center;
    li {
      padding: 0 25px;
      a {
        ${noneStyles.a}

        display: block;
        padding: 10px 0;
        font-size: 20px;
        line-height: 20px;
        color: ${colors.greenLight[0]};
        &:hover {
          color: ${colors.greenLight[1]};
        }
      }
    }
  }
`;

export default StyledMenu;

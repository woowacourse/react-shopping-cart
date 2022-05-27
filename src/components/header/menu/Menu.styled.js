import styled from "@emotion/styled";
import { noneStyles } from "@/styles/styleUtil";

const StyledMenu = styled.div`
  display: inline-flex;
  margin-right: 20px;

  ul {
    ${noneStyles.ul}

    display: flex;
    align-items: center;

    li {
      padding: 0 0 0 25px;
      a {
        ${noneStyles.a}
        position: relative;
        display: block;
        padding: 10px 0;
        font-size: 20px;
        line-height: 20px;
        color: ${(props) => props.theme.colors.white};
      }
    }
  }
`;

export default StyledMenu;

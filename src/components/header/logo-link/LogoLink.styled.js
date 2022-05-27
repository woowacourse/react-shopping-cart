import styled from "@emotion/styled";
import { noneStyles } from "@/styles/styleUtil";

const StyledLogoLink = styled.h1`
  .logo-link {
    ${noneStyles.a}
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${(props) => props.theme.colors.white};
    font-size: 30px;
    font-weight: 900;
    margin-left: 20px;
  }
`;

export default StyledLogoLink;

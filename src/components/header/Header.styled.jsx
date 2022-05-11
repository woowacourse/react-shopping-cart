import styled from "@emotion/styled";
import { colors } from "../../styled";

const StyledHeader = styled.div`
  background-color: ${colors.black[0]};
  border-bottom: 1px solid ${colors.red[0]};

  .logo-link {
    padding: 10px 0;
    flex-shrink: 0;
    width: 90px;
    img {
      width: 70px;
    }
  }
`;

export default StyledHeader;

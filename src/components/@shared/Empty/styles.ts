import styled from "styled-components";
import { flexColumnCenter } from "../../../styles/mixin";

const EmptyImageWrapper = styled.div`
  ${flexColumnCenter};

  img {
    width: 800px;
    height: 600px;
  }
`;

export { EmptyImageWrapper };

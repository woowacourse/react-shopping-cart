import styled from "styled-components";
import { Link } from "react-router-dom";

import { FlexBetween } from "../../SharedStyled/Flex";
import { COLOR } from "../../constants/theme";

const Container = styled.div`
  border: 1px solid ${COLOR.GRAY_250};
  margin: 4rem 0;
`;

const Header = styled(FlexBetween("div"))`
  width: 100%;
  padding: 2.5% 2.2%;
  color: ${COLOR.BLACK};
  font-size: 1.25rem;
`;

const ShowDetailLink = styled(Link)`
  color: ${COLOR.BLACK};
`;

export { Container, Header, ShowDetailLink };

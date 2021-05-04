import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLOR } from "../../constants/theme";

const HeaderContainer = styled.header`
  background-color: ${COLOR.MAIN};
  color: ${COLOR.WHITE};
  height: 5rem;
  box-shadow: 2px 1px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 0 1rem;
`;

const HeaderInner = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 1320px;
  margin: 0 auto;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size: 2.5rem;
  padding-left: 1rem;
`;

const NavigationItem = styled(Link)`
  color: ${COLOR.WHITE};
  margin-left: 2.7rem;
  font-weight: 500
  font-size: 1.5rem
`;

export { HeaderContainer, HeaderInner, Flex, H1, NavigationItem };

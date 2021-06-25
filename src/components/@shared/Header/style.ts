import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLOR } from "../../../constants/theme";

const Container = styled.header`
  background-color: ${COLOR.MAIN};
  height: 5rem;
  box-shadow: 2px 1px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Inner = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 1320px;
  padding: 0 1.5rem;
  margin: 0 auto;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  color: ${COLOR.WHITE};
  font-weight: 900;
  font-size: 2.5rem;
  padding-left: 1rem;
`;

const NavigationItem = styled(Link)`
  color: ${COLOR.WHITE};
  margin-left: 2.7rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

export { Container, Inner, Flex, H1, NavigationItem };

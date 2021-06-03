import styled from "styled-components";

import { FlexCenter, FlexBetween } from "../../sharedStyled/Flex";

const Container = styled(FlexCenter("div"))`
  flex-direction: column;
  max-width: 1320px;
  margin: 0 auto;
  padding: 3.75rem 1.5rem 0 1.5rem;
`;

const Main = styled(FlexBetween("div"))`
  width: 100%;
  flex-wrap: wrap;
  padding: 1.5rem;
`;

const AllDealControlBox = styled(FlexBetween("div"))`
  position: relative;
  width: 60%;
  flex-basis: 100%;
  align-items: center;
`;

const AllDealSelect = styled(FlexBetween("div"))`
  position: relative;
  width: 6.5rem;
  height: 4.75rem;
  align-items: center;
`;

const AllDealDelete = styled.div`
  position: absolute;
  left: 60%;
  bottom: 0;
  transform: translateX(-100%);
`;

const Section = styled.section`
  width: 60%;
`;

const CartListTitle = styled.h2`
  padding: 1.625rem 0 1rem;
`;

export { Container, Main, AllDealControlBox, AllDealSelect, AllDealDelete, Section, CartListTitle };

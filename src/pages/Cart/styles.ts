import styled from "styled-components";
import { FlexBetween } from "../../SharedStyled/Flex";

const Main = styled(FlexBetween("div"))`
  width: 100%;
  flex-wrap: wrap;
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
  margin-top: 1.5rem;
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

const CartListTitle = styled.div`
  padding: 1.625rem 0 1rem;
`;

export {
  Main,
  AllDealControlBox,
  AllDealSelect,
  AllDealDelete,
  Section,
  CartListTitle,
};

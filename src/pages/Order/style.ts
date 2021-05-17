import styled from "styled-components";
import { FlexBetween } from "../../SharedStyled/Flex";

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 3.75rem 1.5rem 0 1.5rem;
`;

const OrderListTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  flex-basis: 100%;
  margin-bottom: 1.25rem;
`;

const Main = styled(FlexBetween("div"))`
  width: 100%;
  flex-wrap: wrap;
  padding: 1.5rem;
`;

const Section = styled.section`
  width: 60%;
`;

export { Container, OrderListTitle, Section, Main };

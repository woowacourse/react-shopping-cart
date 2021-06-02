import styled from "styled-components";

import { FlexCenter } from "../../SharedStyled/Flex";
import { Grid } from "../../SharedStyled/Grid";

const Container = styled(FlexCenter("div"))`
  max-width: 1320px;
  margin: 0 auto;
  padding: 3.75rem 1.5rem 0 1.5rem;
`;

const Inner = styled(Grid("div"))`
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
`;

export { Container, Inner };

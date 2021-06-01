import styled from "styled-components";

import { FlexCenter } from "../../SharedStyled/Flex";

const Container = styled(FlexCenter("div"))`
  max-width: 1320px;
  margin: 0 auto;
  padding: 3.75rem 1.5rem;

  flex-direction: column;

  p {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1rem;
  }

  span {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

export { Container };

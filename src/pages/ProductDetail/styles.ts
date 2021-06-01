import styled from "styled-components";

import { FlexCenter } from "../../SharedStyled/Flex";

const Container = styled(FlexCenter("div"))`
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

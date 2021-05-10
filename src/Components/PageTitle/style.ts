import styled from "styled-components";
import { COLOR } from "../../constants/theme";
import { FlexCenter } from "../../SharedStyled/Flex";

const Container = styled(FlexCenter("div"))`
  width: 100%;
  padding: 0 1rem;
  border-bottom: 0.25rem solid ${COLOR.GRAY_600};
`;

const H1 = styled.h1`
  line-height: 2.5;
`;

export { Container, H1 };

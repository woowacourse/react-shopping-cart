import styled from "@emotion/styled";
import Flex from "./Flex";
import { PropsWithChildren } from "react";

function MobileLayout({ children }: PropsWithChildren) {
  return (
    <Flex>
      <Container>{children}</Container>
    </Flex>
  );
}

const Container = styled.div`
  width: 440px;
  min-height: fit-content;
  max-height: 100vh;
  border: 1px solid grey;
`;

export default MobileLayout;

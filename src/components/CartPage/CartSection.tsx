import styled from "styled-components";
import CartSelector from "./CartSelector";

export function CartSection() {
  return (
    <Section>
      <CartSelector />
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: center;

  @media (max-width: 1260px) {
    height: 50rem;
    overflow: scroll;
  }
`;

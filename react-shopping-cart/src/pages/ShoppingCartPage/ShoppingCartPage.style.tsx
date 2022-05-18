import styled from "styled-components";

export const ShoppingCartPageContent = styled.div<{ gap: string }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ gap }) => gap};
`;

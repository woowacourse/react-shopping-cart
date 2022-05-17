import styled from "styled-components";

export const ShoppingCartPageHeader = styled.div`
  width: 880px;
  padding: 20px 0;
  border-bottom: 3px solid;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  border-bottom-color: ${({ theme }) => theme.colors["black_03"]};
`;

export const ShoppingCartPageContent = styled.div<{ gap: string }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ gap }) => gap};
`;

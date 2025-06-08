import styled from "@emotion/styled";

export const Container = styled.article<{ isSelected: boolean }>`
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #0000001a;

  color: ${({ isSelected }) => (isSelected ? "#000000" : "#bcbcbc")};
`;

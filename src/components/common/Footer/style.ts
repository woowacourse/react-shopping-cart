import styled from "styled-components";

export const Wrapper = styled.div<{ disable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme, disable }) => (disable ? "gray" : theme.color.black)};
  cursor: ${({ disable }) => (disable ? "not-allowed" : "pointer")};
`;

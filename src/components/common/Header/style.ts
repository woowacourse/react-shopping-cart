import styled from "styled-components";

export const Wrapper = styled.header`
  position: sticky;
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  line-height: 16px;
`;

import styled from "styled-components";

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 24px;
  background-color: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.fontWeight.ExtraBold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 16px;
`;

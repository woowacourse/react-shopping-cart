import styled from "styled-components";

export const Wrapper = styled.button`
  width: 100%;
  height: 48px;
  margin-bottom: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
  font-size: 15px;
  font-weight: 700;
  color: rgba(51, 51, 51, 0.75);
  cursor: pointer;
`;

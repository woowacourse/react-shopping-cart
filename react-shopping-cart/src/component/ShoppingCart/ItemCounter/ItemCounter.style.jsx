import styled from "styled-components";

export const CountBox = styled.div`
  width: 48px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
`;

export const CounterButton = styled.button`
  padding: 0;
  cursor: pointer;
  width: 28px;
  height: 20px;
  font-size: 10px;
  border: 1px solid;
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors["gray_04"]};
`;

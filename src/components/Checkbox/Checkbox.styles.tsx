import styled from "@emotion/styled";

export const CheckboxWrapper = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${({ checked, theme }) => (checked ? theme.colors.black : theme.colors.white)};
  color: ${({ checked, theme }) => (checked ? theme.colors.white : theme.colors.gray)};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
`;

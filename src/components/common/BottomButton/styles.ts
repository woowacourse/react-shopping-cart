import styled from "@emotion/styled";

interface BottomButtonProps {
  isDisabled: boolean;
}

export const BottomButtonContainer = styled.button<BottomButtonProps>`
  width: 100%;
  height: 64px;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.gray : theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: none;
  cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
`;

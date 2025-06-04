import styled from "@emotion/styled";
import { ButtonVariants } from "./Button";

const buttonTheme: Record<ButtonVariants, Record<string, string>> = {
  primary: { text: "#ffffff", background: "#333333", border: "#333333" },
  secondary: { text: "#333333bf", background: "#ffffff", border: "#33333340" },
};

export const Button = styled.button<{ variant: ButtonVariants }>`
  background-color: ${({ variant }) => buttonTheme[variant].background};
  color: ${({ variant }) => buttonTheme[variant].text};
  border: 1px solid ${({ variant }) => buttonTheme[variant].border};
  padding: 14px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 700;
  width: 100%;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    pointer-events: none;
  }
`;

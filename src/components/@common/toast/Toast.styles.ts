import { css } from "@emotion/react";
import { fadeInOut } from "../../../animations/animations";

export const ToastStyle = ({ isSuccess }: { isSuccess: boolean }) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 6.4rem;
  width: 42.9rem;
  padding: 1.2rem 7.7rem;
  background-color: ${isSuccess ? "var(--color-green)" : "var(--color-pink)"};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${fadeInOut} 1.5s ease-out forwards;
`;

export const ToastMessage = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  color: var(--color-white);
`;

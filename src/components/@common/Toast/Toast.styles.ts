import styled from "@emotion/styled";
import { TOAST_TYPES, ToastType } from "./type";

const TOAST_COLORS: Record<ToastType, string> = {
  [TOAST_TYPES.SUCCESS]: "#ace6a8",
  [TOAST_TYPES.ERROR]: "#ffc9c9",
} as const;

export const Toast = styled.div<{ $type: ToastType }>`
  position: absolute;
  width: 90%;
  height: 40px;
  background-color: ${({ $type }) => TOAST_COLORS[$type]};
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  text-align: center;
  line-height: 40px;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

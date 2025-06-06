import { css } from "@emotion/react";

export const Container = css`
  padding: 24px 32px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ModalHeader = css`
  display: flex;
  justify-content: space-between;
`;

export const Title = css`
  display: flex;

  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
`;

export const CloseButton = css`
  background: none;
  border: none;
  cursor: pointer;
`;

export const SubmitButton = css`
  width: 100%;
  height: 44px;
  padding: 11px 0;

  background-color: var(--color-black);
  border: none;
  border-radius: 5px;

  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  text-align: center;
`;

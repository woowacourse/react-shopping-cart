import { css } from "@emotion/react";

export const errorFallbackContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

export const errorFallbackImage = css`
  width: 5rem;
`;

export const errorFallbackMessage = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-subtitle);
  color: var(--color-dark-grey);
`;

export const errorFallbackSubMessage = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  color: var(--color-dark-grey);
`;

import { css } from "@emotion/react";

export const TitleContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  gap: 1.2rem;
`;

export const Title = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
  color: var(--color-black);
`;

export const Subtitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  color: var(--color-black);
`;

export const Description = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-body);
  color: var(--color-dark-grey);
`;

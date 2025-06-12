import { css } from "@emotion/react";
import { Title } from "../../../styles/@common/title/Title.styles";

export const CartPriceInfoContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
`;

export const CartPriceTitle = css`
  ${Title}
  color: var(--color-dark-grey);
`;

export const CartPriceSubtitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  color: var(--color-dark-grey);
`;

export const CartPrice = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export const CartPriceDetailContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;

  padding: 1.2rem 0;
  border-top: 1px solid var(--color-light-grey);
  border-bottom: 1px solid var(--color-light-grey);
`;

export const CartPriceWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  gap: 1.2rem;
`;

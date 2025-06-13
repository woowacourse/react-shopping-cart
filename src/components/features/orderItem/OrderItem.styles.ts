import { css } from '@emotion/react';

export const orderItemWrapper = css`
  width: 100%;
  border-top: 1px solid var(--color-light-grey);
  box-sizing: border-box;
  padding: 1.5rem;
`;

export const orderItemStyle = css`
  width: 100%;
  display: flex;
  gap: 2.4rem;
  box-sizing: border-box;

  img {
    width: 11.2rem;
    height: 11.2rem;
    object-fit: cover;
    border-radius: 0.5rem;
    background-color: #000;
  }
`;

export const orderInfoStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  width: 100%;
`;

export const orderItemNameStyle = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  margin: 0;
`;

export const orderItemPriceStyle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  margin: 0;
`;

export const orderItemQuantityStyle = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  color: var(--color-grey);
  margin: 0;
`;

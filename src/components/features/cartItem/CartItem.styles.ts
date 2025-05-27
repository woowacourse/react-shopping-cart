import { css } from "@emotion/react";

export const cartItemWrapper = css`
  /**삭제 예정 */
  margin-top: 400px;

  border-top: 1px solid var(--color-light-grey);
`;

export const cartItemController = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--color-grey);
    border-radius: 4px;
    color: var(--color-black);
    display: inline-flex;
  }
`;

export const cartItemStyle = css`
  width: 100%;
  display: flex;
  gap: 2.4rem;
  padding: 1.5rem;
  box-sizing: border-box;

  img {
    width: 11.2rem;
    height: 11.2rem;
    object-fit: cover;
    border-radius: 0.5rem;
    background-color: #000;
  }
`;

export const cartInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const cartItemNameStyle = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;

export const cartItemPriceStyle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

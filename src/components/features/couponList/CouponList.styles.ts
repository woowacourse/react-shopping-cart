import { css } from '@emotion/react';

export const couponListStyles = {
  container: css`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 16px;
  `,

  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-light-grey);

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
      color: var(--color-black);
    }
  `,

  count: css`
    font-size: 14px;
    color: var(--color-grey);
    background-color: var(--color-light-grey);
    padding: 4px 8px;
    border-radius: 12px;
  `,

  list: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  loading: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    font-size: 16px;
    color: var(--color-grey);
  `,

  error: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    text-align: center;

    p {
      margin: 0 0 16px 0;
      font-size: 16px;
      color: var(--color-red, #dc3545);
    }
  `,

  retryButton: css`
    padding: 8px 16px;
    background-color: var(--color-black);
    color: var(--color-white);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: var(--color-dark-grey);
    }
  `,

  empty: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    font-size: 16px;
    color: var(--color-grey);
    text-align: center;
  `,
};

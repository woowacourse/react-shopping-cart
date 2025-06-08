import { css } from '@emotion/react';

export const couponItemStyles = {
  container: (isSelected: boolean) => css`
    padding: 16px;
    border: 1px solid ${isSelected ? 'var(--color-black)' : 'var(--color-grey)'};
    border-radius: 8px;
    background-color: ${isSelected
      ? 'var(--color-light-grey)'
      : 'var(--color-white)'};
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 12px;

    &:hover {
      border-color: var(--color-black);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    &:focus {
      outline: 2px solid var(--color-black);
      outline-offset: 2px;
    }
  `,

  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  `,

  code: css`
    font-size: 14px;
    font-weight: bold;
    color: var(--color-black);
    background-color: var(--color-light-grey);
    padding: 4px 8px;
    border-radius: 4px;
  `,

  discount: css`
    font-size: 16px;
    font-weight: bold;
    color: var(--color-primary, #007bff);
  `,

  description: css`
    font-size: 14px;
    color: var(--color-black);
    margin-bottom: 8px;
    line-height: 1.4;
  `,

  condition: css`
    font-size: 12px;
    color: var(--color-grey);
    margin-bottom: 8px;
  `,

  expiration: css`
    font-size: 12px;
    color: var(--color-grey);
  `,
};

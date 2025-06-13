import { css } from '@emotion/react';

export const couponItemStyles = {
  container: (isSelected: boolean, isDisabled: boolean = false) => css`
    padding: 16px;
    border: 1px solid ${isSelected ? 'var(--color-black)' : 'var(--color-grey)'};
    border-radius: 8px;
    background-color: ${isSelected
      ? 'var(--color-light-grey)'
      : isDisabled
      ? '#f5f5f5'
      : 'var(--color-white)'};
    cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;
    margin-bottom: 12px;
    opacity: ${isDisabled ? 0.6 : 1};

    &:hover {
      border-color: ${isDisabled ? 'var(--color-grey)' : 'var(--color-black)'};
      box-shadow: ${isDisabled ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
    }

    &:focus {
      outline: ${isDisabled ? 'none' : '2px solid var(--color-black)'};
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

  discount: (isDisabled: boolean = false) => css`
    font-size: 16px;
    font-weight: bold;
    color: ${isDisabled
      ? 'var(--color-grey)'
      : 'var(--color-primary, #007bff)'};
  `,

  description: (isDisabled: boolean = false) => css`
    font-size: 14px;
    color: ${isDisabled ? 'var(--color-grey)' : 'var(--color-black)'};
    margin-bottom: 8px;
    line-height: 1.4;
  `,

  condition: css`
    font-size: 12px;
    color: var(--color-grey);
    margin-bottom: 8px;
  `,

  disabledReason: css`
    font-size: 12px;
    color: var(--color-red, #dc3545);
    margin-bottom: 8px;
    font-weight: 500;
  `,

  expiration: (isDisabled: boolean = false) => css`
    font-size: 12px;
    color: var(--color-grey);
    opacity: ${isDisabled ? 0.7 : 1};
  `,
};

import { css } from '@emotion/react';

export const cartItemStyle = css`
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-light-grey);

  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-right: 1.5rem;
  }

  div {
    flex: 1;

    h3 {
      margin: 0 0 0.5rem 0;
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-body);
    }

    p {
      margin: 0.5rem 0;
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-body);
    }
  }

  button {
  }
`;

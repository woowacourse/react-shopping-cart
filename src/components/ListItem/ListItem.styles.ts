import { css } from '@emotion/react';

export const ListItemStyle = css`
  border-top: 1px solid #e0e0e0;
  list-style: none;
  padding-top: 1.2rem;
`;

export const ListItemBodyStyle = css`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.4rem;
  width: 100%;
`;

export const ItemImageStyle = css`
  width: 11.2rem;
  height: 11.2rem;
  border-radius: 0.8rem;
  object-fit: cover;
`;

export const ItemInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.9rem 0;
  width: 100%;
`;

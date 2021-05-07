import styled from 'styled-components';

export const Order = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-150);
  justify-content: space-between;
`;

export const ImageWrapper = styled.div`
  flex-basis: 20%;
`;

export const Image = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  width: 7rem;
  height: 7rem;
  object-fit: contain;
  border: 1px solid var(--color-grey-100);
`;

export const OrderDetail = styled.div`
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: var(--font-small);
  color: var(--color-grey-500);
  margin-bottom: 1rem;
`;

export const Quantity = styled.span`
  font-size: var(--font-micro);
  color: var(--color-grey-500);
`;

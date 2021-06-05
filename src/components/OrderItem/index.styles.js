import styled from 'styled-components';

export const Order = styled.li`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-150);
  justify-content: space-between;
  background-color: var(--color-white);
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
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: var(--font-small);
  color: var(--color-grey-500);
  margin-bottom: 1rem;
`;

export const PriceAndQuantity = styled.span`
  font-size: var(--font-micro);
  color: ${({ price }) =>
    price ? `var(--color-grey-250)` : `var(--color-grey-500)`};
`;

export const ButtonWrapper = styled.div`
  flex-basis: 20%;
`;

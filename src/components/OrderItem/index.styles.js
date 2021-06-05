import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Order = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-150);
  justify-content: space-between;
  min-width: 26rem;
  background-color: var(--color-white);
`;

export const ImageWrapper = styled.div`
  width: 7rem;
  height: 7rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 1px solid var(--color-grey-100);
  }
`;

export const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  margin-left: 1rem;
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
  min-width: 7rem;
`;

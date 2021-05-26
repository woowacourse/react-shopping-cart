import styled from 'styled-components';

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 0 auto;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;

  & > img {
    width: 25rem;
    height: 25rem;
    margin-bottom: 0.5rem;
    background: transparent;
    border: 1px solid var(--color-grey-100);
  }
`;

export const Name = styled.span`
  width: 100%;
  border-bottom: 2px solid var(--color-brown);
  padding: 1rem 1.5rem;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-normal);
`;

export const PriceWrapper = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
`;

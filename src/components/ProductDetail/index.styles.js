import styled from 'styled-components';

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  width: 90%;
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-grey-100);
  margin: 0 auto;
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

export const Button = styled.button`
  height: 2.7rem;
  background-color: var(--color-brown);
  color: var(--color-white);
  font-size: var(--font-semi-large);
  font-weight: var(--weight-semi-bold);
`;

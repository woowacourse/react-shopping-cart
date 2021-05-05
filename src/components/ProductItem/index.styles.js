import styled from 'styled-components';

export const Product = styled.div`
  width: 12rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Image = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  width: 100%;
  height: 12rem;
  margin-bottom: 0.5rem;
  object-fit: contain;
  border: 1px solid var(--color-grey-100);
`;

export const Description = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.7rem;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

export const Name = styled.span`
  font-size: var(--font-micro);
  color: var(--color-grey-400);
`;

export const Price = styled.span`
  font-size: var(--font-small);
`;

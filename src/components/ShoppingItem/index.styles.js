import styled from 'styled-components';

export const Product = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-150);
`;
export const ImageWrapper = styled.div`
  flex-basis: 20%;
  width: 20%;
  height: 7.5rem;
  min-width: 6.375rem;
  min-height: 6.375rem;
  border: 1px solid var(--color-grey-100);
`;
export const Image = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: contain;
`;

export const Name = styled.span`
  flex-basis: 43%;
  font-size: var(--font-small);
  color: var(--color-grey-500);
`;

export const Controller = styled.div`
  flex-basis: 27%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  color: var(--color-grey-500);
  font-size: var(--font-small);
  gap: 0.5rem;

  & > button {
    width: auto;
    text-align: right;
  }
`;

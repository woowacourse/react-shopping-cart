import styled from 'styled-components';

export const Product = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-150);
`;

export const Image = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  flex-basis: 20%;
  width: 20%;
  object-fit: contain;
  border: 1px solid var(--color-grey-100);
`;

export const Name = styled.span`
  flex-basis: 45%;
  font-size: var(--font-small);
  color: var(--color-grey-500);
`;

export const Controller = styled.div`
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  color: var(--color-grey-500);
  font-size: var(--font-small);

  // TODO: Button / Button 추상화
  & > button {
    width: auto;
    text-align: right;
  }
`;

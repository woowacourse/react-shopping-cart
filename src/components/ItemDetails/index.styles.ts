import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  width: 100%;
`;

export const ItemImage = styled.img`
  display: block;
  width: 570px;
  height: 570px;
  object-fit: contain;
  margin: auto;
  @media screen and (max-width: 850px) {
    width: 350px;
    height: 350px;
  }
`;

export const ItemTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.25em;
  letter-spacing: 0.5px;
  text-align: left;
  border-bottom: 4px solid #aaaaaa;
  padding: 1.5em;
  @media screen and (max-width: 850px) {
    font-size: 1.5rem;
    padding: 1em;
  }
`;

export const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 2rem;
    color: ${(props) => props.color};
    padding: 1.5em;
  }
  @media screen and (max-width: 850px) {
    p {
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
`;

export const ShoppingCartButton = styled.button<{ backgroundColor: string }>`
  width: 100%;
  height: 100px;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 2rem;
  &:hover {
    opacity: 0.9;
  }
  @media screen and (max-width: 850px) {
    font-size: 1rem;
    height: 40px;
  }
`;

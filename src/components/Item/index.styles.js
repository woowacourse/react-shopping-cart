import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  width: 280px;
  height: 360px;
  &:hover {
    transition: 1s;
    transform: translateY(-5px);
    opacity: 0.9;
  }
`;

export const ItemImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: contain;
  display: block;
  cursor: pointer;
`;

export const ItemInfoWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

export const ItemInfo = styled.p`
  font-family: NotoSansKR;
  margin: 0;
  line-height: 22px;
  letter-spacing: 1px;
  cursor: pointer;
`;

export const ShoppingCartImage = styled.svg`
  fill: green;
`;

export const ShoppingCartButton = styled.button`
  background-color: transparent;
  border: none;
`;

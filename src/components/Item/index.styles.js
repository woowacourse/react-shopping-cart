import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  width: 280px;
  height: 360px;
  border-radius: 5px;
  padding: 10px 3px 0 3px;
  cursor: pointer;
  &:hover {
    transition: 0.3s;
    background-color: ${(props) => props.backgroundColorOnHover};
    p:first-of-type {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.textColorOnHover};
    }
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
  max-width: 280px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

export const ItemInfo = styled.p`
  margin: 0;
  line-height: 22px;
  letter-spacing: 1px;
  cursor: pointer;
`;

export const ShoppingCartButton = styled.button`
  background-color: transparent;
  border: none;
`;

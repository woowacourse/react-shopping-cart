import { styled } from "styled-components";
import Item from "./Item";
import type { ItemType } from "../types/domain";

const ItemList = ({ items }: { items: ItemType[] }) => {
  return (
    <ItemListWrapper>
      {items.map((item) => (
        <Item key={crypto.randomUUID()} {...item} />
      ))}
    </ItemListWrapper>
  );
};

const ItemListWrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);

  grid-column-gap: 20px;
  grid-row-gap: 60px;
  width: 100%;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  transition: all 0.3s ease;
`;

export default ItemList;

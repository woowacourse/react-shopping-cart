import { styled } from "styled-components";
import Item from "./Item";
import type { ItemType } from "../types/domain";

const ItemList = ({ items }: { items: ItemType[] }) => {
  return (
    <ItemListWrapper>
      {items.map((item) => (
        <Item {...item} />
      ))}
    </ItemListWrapper>
  );
};

const ItemListWrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);

  grid-row-gap: 60px;
  width: 100%;
`;

export default ItemList;

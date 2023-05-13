import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { itemsState } from "../recoil/atom";
import type { ItemListType } from "../types/domain";
import Item from "./Item";

const ItemList = () => {
  const items = useRecoilValue<ItemListType>(itemsState);

  return (
    <Wrapper>
      {items.map((item) => (
        <Item key={crypto.randomUUID()} {...item} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  grid-gap: 60px 20px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default ItemList;

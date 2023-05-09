import Header from "../components/Header";
import { useRecoilState } from "recoil";
import { itemsState } from "../store";
import ItemList from "../components/ItemList";
import Page from "../components/Page";
import { ItemType } from "../types/domain";

const Main = () => {
  const [items, setItems] = useRecoilState<ItemType[]>(itemsState);

  const countCartItems = () => {
    return items.filter((item) => item.count).length;
  }

  return (
    <div>
      <Header cartCount={countCartItems()}/>
      <Page>
        <ItemList items={items} />
      </Page>
    </div>
  );
};

export default Main;

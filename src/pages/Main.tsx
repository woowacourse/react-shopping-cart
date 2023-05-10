import { useRecoilValue } from "recoil";
import { itemsState } from "../recoil/atom";
import { Header, Page, ItemList } from "../components";
import type { ItemType } from "../types/domain";

const Main = () => {
  const items = useRecoilValue<ItemType[]>(itemsState);

  return (
    <>
      <Header />
      <Page>
        <ItemList items={items} />
      </Page>
    </>
  );
};

export default Main;

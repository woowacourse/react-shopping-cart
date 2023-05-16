import { useRecoilValue } from "recoil";
import { productListState } from "../recoil/atom";
import { Header, Page, ItemList } from "../components";
import type { Product } from "../types/domain";

const Main = () => {
  const productList = useRecoilValue<Product[]>(productListState);

  return (
    <>
      <Header />
      <Page>
        <ItemList items={productList} />
      </Page>
    </>
  );
};

export default Main;

import { ProductCardList } from "../components/product/ProductCardList";
import { Layout } from "../layout";
import { Suspense } from "react";

function Main() {
  return (
    <Layout>
      <Suspense>
        <ProductCardList />
      </Suspense>
    </Layout>
  );
}

export default Main;

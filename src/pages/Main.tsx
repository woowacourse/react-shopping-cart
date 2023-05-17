import ProductCardList from "../components/ProductCardList/ProductCardList";
import Loading from "../components/common/Loading/Loading";
import { Suspense } from "react";

const Main = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductCardList />
    </Suspense>
  );
};

export default Main;

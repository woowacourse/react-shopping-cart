import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Header, Page, ProductList } from "../components";
import { productsState } from "../recoil/atom";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setProducts = useSetRecoilState(productsState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("*/api/products");
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Page>
        {isLoading ? <div>상품 목록 불러오는 중...</div> : <ProductList />}
      </Page>
    </>
  );
};

export default Main;

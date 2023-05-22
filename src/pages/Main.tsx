import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { fetchProducts } from "../api";
import { Header, Loading, Page, ProductList } from "../components";
import { useFetch } from "../hooks/useFetch";
import { initialProductsState, productsState } from "../recoil/atom";
import { getNewProducts } from "../utils/domain";

const Main = () => {
  const setInitialProducts = useSetRecoilState(initialProductsState);
  const setProducts = useSetRecoilState(productsState);
  const { isLoading } = useFetch();

  useEffect(() => {
    const fetchInitialProducts = async () => {
      console.log(1);
      const initialProducts = await fetchProducts();
      setInitialProducts(initialProducts);

      const newProducts = await getNewProducts(initialProducts);
      setProducts(newProducts);
    };

    fetchInitialProducts();
  }, []);

  return (
    <>
      <Header />
      <Page>{isLoading ? <Loading /> : <ProductList />}</Page>
    </>
  );
};

export default Main;

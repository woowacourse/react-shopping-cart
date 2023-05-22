import { Header, Loading, Page, ProductList } from "../components";
import { useFetch } from "../hooks/useFetch";

const Main = () => {
  const { isLoading } = useFetch();

  return (
    <>
      <Header />
      <Page>{isLoading ? <Loading /> : <ProductList />}</Page>
    </>
  );
};

export default Main;

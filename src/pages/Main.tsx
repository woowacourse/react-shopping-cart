import { Header, Loading, Page, ProductList } from "../components";
import { useFetch } from "../hooks/useFetch";

const Main = () => {
  const { isLoading } = useFetch();

  return (
    <>
      <Header />
      <Page>
        {isLoading ? (
          <Loading message="상품 목록 불러오는 중..." />
        ) : (
          <ProductList />
        )}
      </Page>
    </>
  );
};

export default Main;

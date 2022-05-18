import { PageContainer, Error } from 'components/@shared';
import Header from 'components/Header/Header.component';
import ProductListContainer from 'components/ProductListContainer/ProductListContainer.component';
import Loading from 'components/Loading/Loading.component';
import useFetch from 'hooks/useFetch';

function ProductList() {
  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_API_HOST}/product`);

  return (
    <>
      <Header />
      <PageContainer>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error>서버에 연결할 수 없습니다.</Error>
        ) : (
          <ProductListContainer productList={data} />
        )}
      </PageContainer>
    </>
  );
}

export default ProductList;

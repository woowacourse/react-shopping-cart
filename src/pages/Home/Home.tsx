import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import ProductList from '../../components/product/ProductList/ProductList';
import Pagination from '../../components/common/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import ErrorContainer from '../../components/common/ErrorContainer/ErrorContainer';
import * as Styled from './Home.style';
import { fetchProductListAsync } from '@/store/product/action';
import { useThunkFetch } from '@/hooks/useFecth';
import { fetchGetCartAsync } from '@/store/cart/action';
import Loading from '@/components/common/Loading/Loading';

function Home() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) ?? 1;

  const {
    isLoading: isProductLoading,
    pageCount,
    productList,
  } = useThunkFetch({
    selector: state => state.product,
    thunkAction: () => fetchProductListAsync(currentPage),
    deps: [currentPage],
  });

  const { isLoading: isCartLoading } = useThunkFetch({
    selector: state => state.cart,
    thunkAction: fetchGetCartAsync,
    deps: [],
  });

  if (isProductLoading) {
    return (
      <PageTemplate>
        <Styled.Container>
          <ProductList.skeleton />
          <Pagination />
        </Styled.Container>
      </PageTemplate>
    );
  }

  if (currentPage > pageCount) {
    return (
      <PageTemplate>
        <Styled.Container>
          <ErrorContainer>😱 존재하지 않는 상품 페이지입니다. 😱</ErrorContainer>
          <Pagination />
        </Styled.Container>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Styled.Container>
        <ProductList productList={productList} />
        <Pagination />

        {isCartLoading && <Loading type="page">👻</Loading>}
      </Styled.Container>
    </PageTemplate>
  );
}

export default Home;

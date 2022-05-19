import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import ProductList from '../../components/product/ProductList/ProductList';
import Pagination from '../../components/common/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import ErrorContainer from '../../components/common/ErrorContainer/ErrorContainer';
import * as Styled from './Home.style';
import { fetchProductListAsync } from '@/store/product/action';
import { useThunkFetch } from '@/hooks/useFecth';

function Home() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) ?? 1;

  const { isLoading, pageCount, productList } = useThunkFetch({
    selector: state => state.product,
    thunkAction: () => fetchProductListAsync(currentPage),
    deps: [currentPage],
  });

  return (
    <PageTemplate>
      <Styled.Container>
        {currentPage > pageCount && (
          <ErrorContainer>😱 존재하지 상품 페이지입니다. 😱</ErrorContainer>
        )}

        {isLoading ? <ProductList.skeleton /> : <ProductList productList={productList} />}

        <Pagination />
      </Styled.Container>
    </PageTemplate>
  );
}

export default Home;

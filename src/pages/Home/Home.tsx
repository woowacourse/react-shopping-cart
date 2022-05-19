import { useEffect } from 'react';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import ProductList from '../../components/product/ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/common/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import ErrorContainer from '../../components/common/ErrorContainer/ErrorContainer';
import * as Styled from './Home.style';
import { fetchProductListAsync, ProductListAction } from '@/store/product/action';
import { Dispatch } from 'redux';

function Home() {
  const dispatch = useDispatch<Dispatch<ProductListAction>>();
  const { isLoading, pageCount, productList } = useSelector(({ product }) => product);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) ?? 1;

  useEffect(() => {
    dispatch(fetchProductListAsync(currentPage) as any);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

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

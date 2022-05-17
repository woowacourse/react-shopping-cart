import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProducts, productsAsyncThunk } from 'store/action/productsActions';

import { GridLayout } from 'component/common';
import LoadingSpinner from 'component/LoadingSpinner/LoadingSpinner';
import PageController from 'component/common/PageController/PageController';
import ProductContainer from 'container/ProductContainer';
import { PRODUCTS_COUNT_PER_PAGE } from 'constant';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 60px 0;
`;

function ProductList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector(products => products);

  const currentPageProducts = products.slice(
    (currentPage - 1) * PRODUCTS_COUNT_PER_PAGE,
    currentPage * PRODUCTS_COUNT_PER_PAGE
  );
  const pageLength = products.length / PRODUCTS_COUNT_PER_PAGE + 1;

  useEffect(() => {
    if (products.length) {
      dispatch(clearProducts());
    }
    dispatch(productsAsyncThunk());
  }, []);

  const handlePageChange = event => {
    const order = event.target.name;
    setCurrentPage(Number(order));
  };

  return (
    <Content>
      {products.length ? (
        <>
          <GridLayout>
            {currentPageProducts.map(product => (
              <ProductContainer key={product.id} {...product} />
            ))}
          </GridLayout>
          <PageController
            pageLength={pageLength}
            currentPage={currentPage}
            onClickButton={handlePageChange}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Content>
  );
}

export default ProductList;

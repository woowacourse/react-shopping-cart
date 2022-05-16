import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProducts, productsAsyncThunk } from 'store/action/productsActions';

import { GridLayout } from 'component/common';
import LoadingSpinner from 'component/LoadingSpinner/LoadingSpinner';
import ProductContainer from 'container/ProductContainer';
import PageController from 'component/common/PageController/PageController';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 60px 0;
`;

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector(products => products);
  const dispatch = useDispatch();

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
            {products.slice((currentPage - 1) * 12, currentPage * 12).map(product => (
              <ProductContainer key={product.id} {...product} />
            ))}
          </GridLayout>
          <PageController
            pageLength={products.length / 12 + 1}
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

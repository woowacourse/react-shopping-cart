import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsAsyncThunk from 'redux/products/productsThunk';

import { GridLayout } from 'components/@common';
import { ListProduct, LoadingSpinner, PageLayout } from 'components';

function ProductList() {
  const products = useSelector(products => products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsAsyncThunk());
  }, []);

  return (
    <PageLayout>
      {products.length ? (
        <GridLayout>
          {products.map(product => (
            <ListProduct key={product.id} {...product} />
          ))}
        </GridLayout>
      ) : (
        <LoadingSpinner />
      )}
    </PageLayout>
  );
}

export default ProductList;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsAsyncThunk } from 'store/action/productsActions';

import { GridLayout } from 'component/@common';
import { LoadingSpinner, PageLayout, Product } from 'component';

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
            <Product key={product.id} {...product} />
          ))}
        </GridLayout>
      ) : (
        <LoadingSpinner />
      )}
    </PageLayout>
  );
}

export default ProductList;

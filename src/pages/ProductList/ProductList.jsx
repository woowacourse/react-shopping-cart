import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsAsyncThunk from 'redux/products/productsThunk';

import { GridLayout } from 'components/@common';
import { ListProduct, LoadingSpinner, PageLayout } from 'components';

function ProductList() {
  const products = useSelector(products => products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length) return;

    dispatch(productsAsyncThunk());
  }, []);

  if (!products.length) {
    return (
      <PageLayout>
        <LoadingSpinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <GridLayout>
        {products.map(product => (
          <ListProduct key={`list${product.id}`} {...product} />
        ))}
      </GridLayout>
    </PageLayout>
  );
}

export default ProductList;

import React, { useState, useEffect } from 'react';

import ProductItem from '../components/ProductItem';
import GridColumnList from '../components/utils/GridColumnList';

import { getProducts } from '../api/products';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const setProductsByFetch = async () => {
      setProducts(await getProducts());
    };

    setProductsByFetch();
  }, []);

  return (
    <>
      <GridColumnList gridColumnGap="48px" gridRowGap="28px" gridColumnRepeatCount={4} gridColumnWidth="282px">
        {products && products.map((product) => <ProductItem product={product} key={product.id} />)}
      </GridColumnList>
    </>
  );
};

export default ProductListPage;

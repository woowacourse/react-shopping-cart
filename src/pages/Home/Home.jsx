import React, { useEffect, useState } from 'react';
import { getProductList } from '../../api/api';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import ProductList from '../../components/product/ProductList/ProductList';

export default function Home() {
  const [productList, setProductList] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      let data;
      try {
        data = await getProductList();
        setProductList(data);
      } catch ({ message }) {
        console.log(message);
        return;
      }
    };

    fetch();
  }, []);

  return <PageTemplate>{productList && <ProductList productList={productList} />}</PageTemplate>;
}

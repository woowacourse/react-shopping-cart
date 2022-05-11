import React from 'react';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import ProductList from '../../components/product/ProductList/ProductList';

export default function Home() {
  return (
    <PageTemplate>
      <ProductList />
    </PageTemplate>
  );
}

import React from 'react';
import { ProductCardList } from './components/productCardList/ProductCardList';
import { Layout } from './layout';
import { useMockData } from './hooks/useMockData';

function App() {
  const { mockData } = useMockData();

  return (
    <Layout>
      <ProductCardList products={mockData} />
    </Layout>
  );
}

export default App;

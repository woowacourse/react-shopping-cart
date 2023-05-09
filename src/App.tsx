import React from 'react';
import mockData from './assets/mockData.json';
import { ProductCardList } from './components/productCardList/ProductCardList';
import { Layout } from './layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <ProductCardList products={mockData} />
      </Layout>
    </div>
  );
}

export default App;

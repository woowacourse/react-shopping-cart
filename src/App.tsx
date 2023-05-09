import React from 'react';
import mockData from './assets/mockData.json';
import { ProductCardList } from './components/productCardList/ProductCardList';
import { Layout } from './layout';
import { atom } from 'recoil';

export const cartListState = atom<number[]>({
  key: 'cartListState',
  default: [],
});

function App() {
  return (
    <Layout>
      <ProductCardList products={mockData} />
    </Layout>
  );
}

export default App;

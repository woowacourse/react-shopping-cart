import React from 'react';
import mockData from './assets/mockData.json';
import { ProductCardList } from './components/productCardList/ProductCardList';

function App() {
  return (
    <div className="App">
      <ProductCardList products={mockData} />
    </div>
  );
}

export default App;

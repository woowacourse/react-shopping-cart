import React from 'react';
import mockData from './assets/mockData.json';
import { ProductCard } from './components/productCard/ProductCard';

function App() {
  return (
    <div className="App">
      <ProductCard product={mockData[0]} />
    </div>
  );
}

export default App;

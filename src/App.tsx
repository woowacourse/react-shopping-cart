import React from 'react';
import ProductList from './components/ProductList';
import TotalAmount from './components/TotalAmount';
import './App.css';

function App() {
  return (
    <div>
      <TotalAmount />
      <h1>상품 목록</h1>
      <ProductList />
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductList from 'pages/ProductList';

function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
    </Routes>
  );
}

export default MainContent;

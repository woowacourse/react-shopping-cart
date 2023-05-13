import React from 'react';
import Check from '@/components/Check';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Check />} />
        <Route path="/test" element={<div>test</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

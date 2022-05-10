import React from 'react';
import Header from '../Header/Header';

export default function PageTemplate({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

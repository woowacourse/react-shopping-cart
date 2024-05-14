import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import ProductList from './components/ProductList';
import { Products } from './types/Product';
import './App.css';

function App() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>상품 목록</h1>
      <ProductList products={products} />
    </div>
  );
}

export default App;

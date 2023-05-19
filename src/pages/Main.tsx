import { ProductCardGrid } from '../components/main/productCardList/ProductCardList';
import { Layout } from '../layout';
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

function Main() {
  const [mockData, setMockData] = useState<Product[] | undefined>();

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        setMockData(data);
      });

    fetch('/cart-items')
      .then((res) => res.json())
      .then((data) => {});
  }, []);

  return (
    <Layout>
      {mockData ? <ProductCardGrid products={mockData} /> : <>loading...</>}
    </Layout>
  );
}

export default Main;

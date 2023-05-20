import { ProductCardGrid } from '../components/main/productCardGrid/ProductCardGrid';
import { Layout } from '../layout';
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

function Main() {
  const [products, setProducts] = useState<Product[] | undefined>();

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <Layout>
      {products ? <ProductCardGrid products={products} /> : <>loading...</>}
    </Layout>
  );
}

export default Main;

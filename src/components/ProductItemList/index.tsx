import ProductItem from '../ProductItem';
import styles from './index.module.css';
import { Product } from '../../types';
import { useEffect, useState } from 'react';

const ProductItemList = () => {
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    const response = await fetch('/products', { method: 'GET' });
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <section className={styles.container}>
      {products.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
};

export default ProductItemList;

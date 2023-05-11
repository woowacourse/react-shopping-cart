import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import styles from './index.module.scss';
import { $Products } from '../../recoil/atom';
import { useRecoilState } from 'recoil';
import { Product } from '../../types';

const ProductItemList = () => {
  const [products, setProducts] = useRecoilState($Products);

  useEffect(() => {
    fetch('./products/')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [setProducts]);

  return (
    <section className={styles.container}>
      {products.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
};

export default ProductItemList;

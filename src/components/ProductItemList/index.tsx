import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import styles from './index.module.css';
import { $Products } from '../../recoil/atom';
import { useRecoilState } from 'recoil';
import { Product } from '../../types';
import { toast } from 'react-toastify';
import errorMessage from '../../constant/errorMessage';

const ProductItemList = () => {
  const [products, setProducts] = useRecoilState($Products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./products/');
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        toast.error(errorMessage);
      }
    };

    fetchData();
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

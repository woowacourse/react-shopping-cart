import ProductItem from '../ProductItem';
import styles from './index.module.css';
import { Product } from '../../types';
import useFetchProducts from '../../hooks/useFetchProducts';
import { useRecoilState } from 'recoil';
import { $Products } from '../../recoil/atom';

const ProductItemList = () => {
  const [products, setProducts] = useRecoilState($Products);

  useFetchProducts(setProducts);

  return (
    <section className={styles.container}>
      {products.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
};

export default ProductItemList;

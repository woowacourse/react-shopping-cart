import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types';
import useFetchProducts from '../../hooks/useFetchProduct';
import { useRecoilState } from 'recoil';
import { productsState } from '../../store/cartProductAtom';
import styles from './index.module.css';

const ProductCardList = () => {
  const [products, setProducts] = useRecoilState(productsState);

  useFetchProducts(setProducts);

  return (
    <section className={styles.container}>
      {products.map((item: Product) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </section>
  );
};

export default ProductCardList;

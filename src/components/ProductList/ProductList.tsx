import { useRecoilValue } from 'recoil';

import { productListState } from '../../store/product';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const productList = useRecoilValue(productListState);

  return (
    <div className={styles.container}>
      {productList.map((productItem) => (
        <ProductItem key={productItem.id} information={productItem} />
      ))}
    </div>
  );
};

export default ProductList;

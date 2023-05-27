import { useRecoilValue } from 'recoil';

import { currentProductList } from '../../../store/selectors';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const productItems = useRecoilValue(currentProductList);

  return (
    <div className={styles.container}>
      {productItems?.map((productItem) => (
        <ProductItem key={productItem.id} information={productItem} />
      ))}
    </div>
  );
};

export default ProductList;

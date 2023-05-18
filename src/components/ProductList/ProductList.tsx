import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { useProductListFetch } from '../../hooks/useProductList';
import productListState from '../../store/product';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const productList = useRecoilValue(productListState);
  useProductListFetch();
  useEffect(() => {}, [productList]);

  return (
    <div className={styles.container}>
      {productList.map((productItem) => (
        <ProductItem key={productItem.id} information={productItem} />
      ))}
    </div>
  );
};

export default ProductList;

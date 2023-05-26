import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useProducts from '../../../hooks/useProducts';
import productListState from '../../../store/product';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import ProductItem from '../ProductItem/ProductItem';
import styles from './styles.module.css';

const ProductList = () => {
  const productItems = useRecoilValue(productListState);

  const [isLoading, setIsLoading] = useState(false);

  const { fetchProductList } = useProducts();

  useEffect(() => {
    const fetchProductItems = async () => {
      setIsLoading(true);
      try {
        await fetchProductList();
      } catch (error) {}
      setIsLoading(false);
    };

    fetchProductItems();
  }, [fetchProductList]);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {productItems?.map((productItem) => (
        <ProductItem key={productItem.id} information={productItem} />
      ))}
    </div>
  );
};

export default ProductList;

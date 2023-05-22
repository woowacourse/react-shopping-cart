import ProductItem from '../ProductItem';
import * as S from './ProductList.styles';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/products';
import { fetchProductData } from '../../../apis/products';
import ProductListSkeleton from './ProductListSkeleton';

const ProductList = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const data = await fetchProductData();
      setItems(data);

      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) return <ProductListSkeleton />;

  return (
    <S.List>
      {items.map((product) => (
        <li key={product.id}>
          <ProductItem {...product} />
        </li>
      ))}
    </S.List>
  );
};

export default ProductList;

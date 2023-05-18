import ProductItem from '../ProductItem';
import * as S from './ProductList.styles';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/products';
import { fetchProductData } from '../../../apis/products';

const ProductList = () => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProductData();
      setItems(data);
    };

    getData();
  }, []);

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

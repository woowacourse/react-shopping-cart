import { ProductItem } from '../components/ProductItem';
import * as Styled from './styles/ProductList.styles';
import { useEffect, useState } from 'react';

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Styled.Wrapper>
      {products.map(({ id, name, price, imageUrl }) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          price={price}
          imageUrl={imageUrl}
        />
      ))}
    </Styled.Wrapper>
  );
};

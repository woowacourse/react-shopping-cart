import styled from 'styled-components';
import useControlCart from '@hooks/useControlCart';
import useProductList from '@hooks/useProductList';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { addProductToCart, removeProductFromCart } = useControlCart();
  const productList = useProductList();

  return (
    <Container>
      {productList.map((product) => (
        <ProductItem
          product={product}
          addProductToCart={() => addProductToCart(product)}
          removeProductFromCart={() => removeProductFromCart(product.id)}
          key={product.id}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 80px 46px;
`;

export default ProductList;

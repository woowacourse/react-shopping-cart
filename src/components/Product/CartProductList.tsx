import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import CartProductItem from './CartProductItem';

import { fetchCartProducts } from '../../apis/cartProducts';
import type { CartProduct } from '../../types/product';

const CartProductList = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const getCartProducts = async () => {
      const data = await fetchCartProducts();
      setCartProducts(data);
    };

    getCartProducts();
  }, []);

  return (
    <CartProductListContainer>
      {cartProducts.map((cartProduct) => (
        <li key={cartProduct.id}>
          <CartProductItem cartProduct={cartProduct} />
        </li>
      ))}
    </CartProductListContainer>
  );
};

const CartProductListContainer = styled.ul`
  & > li {
    padding: 30px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

export default CartProductList;

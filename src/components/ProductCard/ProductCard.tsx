import { memo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  deleteCartItem,
  postCartItem,
  updateCartItem,
} from '../../api/cartList';
import { ReactComponent as ShoppingCartImg } from '../../assets/icon/shopping-cart.svg';
import { cartAtom, cartSelectorFamily } from '../../store/cart';
import { Product } from '../../types/product';
import Counter from '../common/Counter/Counter';
import ProductImg from './ProductImg/ProductImg';
import ProductInfo from './ProductInfo/ProductInfo';

const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  const setCart = useSetRecoilState(cartAtom);
  const productInCart = useRecoilValue(cartSelectorFamily(id));
  const [count, setCount] = useState(productInCart?.quantity);

  const addToCart = () => {
    setCount(1);
    postCartItem(id);
    setCart((prev) => [
      ...prev,
      { id, quantity: 1, product: { id, name, price, imageUrl } },
    ]);
  };

  const plusOne = async () => {
    setCount(count + 1);
    updateCartItem(id, count + 1);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id, quantity: count + 1, product: { id, name, price, imageUrl } }
          : item
      )
    );
  };

  const minusOne = () => {
    setCount(count - 1);

    if (count - 1 === 0) {
      deleteCartItem(id);
      setCart((prev) => [...prev.filter((item) => item.id !== id)]);
      return;
    }
    updateCartItem(id, count - 1);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id, quantity: count - 1, product: { id, name, price, imageUrl } }
          : item
      )
    );
  };

  return (
    <Container>
      <ProductImg
        imageUrl={imageUrl}
        size={{ width: '282px', height: '282px' }}
      />
      <ProductDetail>
        <ProductInfo name={name} price={price} />
        {count > 0 ? (
          <Counter plusOne={plusOne} minusOne={minusOne} quantity={count} />
        ) : (
          <ShoppingCart onClick={addToCart}>
            <ShoppingCartImg />
          </ShoppingCart>
        )}
      </ProductDetail>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 282px;
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShoppingCart = styled.button`
  display: flex;

  cursor: pointer;
`;

export default memo(ProductCard);

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import CartIcon from '../../assets/CartIcon';
import type { CartProduct, Product } from '../../types/product';
import AmountCounter from '../Common/AmountCounter';
import { cartProductState } from '../../states/cartProductState';
import { useEffect } from 'react';

interface ProductItemProps {
  product: Product;
}

const findTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.find((cartProduct) => id === cartProduct.product.id);

const deleteProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.filter((cartProduct) => cartProduct.product.id !== id);

const addTargetQuantity = (cartProducts: CartProduct[], id: number) =>
  cartProducts.map((cartProduct) => {
    if (cartProduct.product.id === id) {
      return { ...cartProduct, quantity: cartProduct.quantity + 1 };
    }
    return cartProduct;
  });

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, imageUrl, name, price } = product;
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);

  const addCount = () => {
    setCartProducts((prev) => addTargetQuantity(prev, id));
  };

  const subtractCount = () => {
    setCartProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.product.id === id) {
          return { ...cartProduct, quantity: cartProduct.quantity - 1 };
        }
        return cartProduct;
      })
    );
  };

  const addProduct = () => {
    setCartProducts((prev) => [
      ...prev,
      { id: Date.now(), quantity: 1, product },
    ]);
  };

  const target = findTargetProduct(cartProducts, id);

  useEffect(() => {
    if (target?.quantity === 0) {
      setCartProducts((prev) => deleteProduct(prev, id));
    }
  }, [id, setCartProducts, target?.quantity]);

  return (
    <ProductContainer>
      <ProductImage src={imageUrl} alt={name} />
      <ProductInfoContainer>
        <dl>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString('ko-KR')} 원</ProductPrice>
        </dl>
        {!target || target.quantity === 0 ? (
          <ProductCartBtn type='button' onClick={addProduct}>
            <CartIcon width={25} height={22} color='var(--gray-400)' />
          </ProductCartBtn>
        ) : (
          <AmountCounter
            count={target ? target.quantity : 0}
            addCount={addCount}
            subtractCount={subtractCount}
          />
        )}
      </ProductInfoContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 282px;
`;

const ProductImage = styled.img`
  width: 282px;
  height: 282px;
`;

const ProductInfoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  padding: 0 14px;
`;

const ProductName = styled.dt`
  line-height: 22px;
`;

const ProductPrice = styled.dd`
  font-size: 20px;
  line-height: 26.67px;
`;

const ProductCartBtn = styled.button`
  position: absolute;
  top: 0;
  right: 14px;
`;

export default ProductItem;

import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { CartInformation, ProductInformation } from '@type/types';
import { theme } from '@styles/theme';
import AddCartButton from './AddCartButton';

const ProductItem = ({ id, name, price, imageUrl }: ProductInformation) => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const addProductToCart = useCallback(() => {
    const product: CartInformation = {
      id,
      product: { name, price, imageUrl, id },
      quantity: 1,
    };

    setCart([...cart, product]);
  }, [cart, id, imageUrl, name, price, setCart]);

  const removeProductFromCart = useCallback(() => {
    const updatedCart = cart.filter((product) => id !== product.id);

    setCart(updatedCart);
  }, [cart, id, setCart]);

  return (
    <ProductItemWrapper>
      <Picture src={imageUrl} alt={name} />
      <InformationWrapper>
        <TitleAndPriceWrapper>
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')} 원</Price>
        </TitleAndPriceWrapper>
        <AddCartButton
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
        />
      </InformationWrapper>
    </ProductItemWrapper>
  );
};

const ProductItemWrapper = styled.div`
  width: 282px;
`;

const Picture = styled.img`
  width: 282px;
  height: 282px;

  margin-bottom: 18px;
`;

const InformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-left: 10px;
`;

const TitleAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

export default React.memo(ProductItem);

import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { SmallCartIcon } from '../../assets/icons';
import { formatPrice } from '../../utils/formatPrice';
import Counter from '../Counter/Counter';
import { useRecoilState } from 'recoil';
import { cartState } from '../../atoms';
import { uuid } from '../../utils/uuid';
import type { Product } from '../../types/product';

const ProductItem = (product: Product) => {
  const { id, name, price, imageSrc } = product;
  const [cart, setCart] = useRecoilState(cartState);
  const [quantityInCart, setQuantityInCart] = useState(0);

  const addProduct = (product: Product) => {
    setCart((prevCart) => {
      return [
        ...prevCart,
        {
          id: uuid(),
          quantity: 1,
          product,
        },
      ];
    });
  };

  const updateProductQuantity = (targetId: number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((cartProduct) => {
        if (cartProduct.product.id !== targetId) return cartProduct;

        return {
          ...cartProduct,
          quantity,
        };
      });
    });
  };

  const removeProduct = (targetId: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartProduct) => cartProduct.product.id !== targetId),
    );
  };

  const handleClickCartButton = () => {
    setQuantityInCart(1);
    addProduct(product);
  };

  const handleChangeQuantity = (count: number) => {
    setQuantityInCart(count);

    if (count === 0) {
      removeProduct(id);
      return;
    }

    updateProductQuantity(id, count);
  };

  return (
    <ItemContainer>
      <ImageWrapper>
        <Image src={imageSrc} loading="lazy" alt={name} />
        <ImageBackground />
      </ImageWrapper>

      <Contents>
        <div>
          <Title>{name}</Title>
          <Price>{formatPrice(price)}</Price>
        </div>

        {quantityInCart ? (
          <Counter
            count={quantityInCart}
            onChangeCount={handleChangeQuantity}
          />
        ) : (
          <CartButton
            type="button"
            aria-label="장바구니에 추가하기"
            onClick={handleClickCartButton}
          >
            <SmallCartIcon />
          </CartButton>
        )}
      </Contents>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  width: 282px;
  height: 358px;
`;

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 282px;
  height: 282px;
`;

const ImageBackground = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 3px;
  font-size: 20px;
  font-weight: 400;
`;

const CartButton = styled.button`
  background: none;
  border: none;

  cursor: pointer;
`;

export default ProductItem;

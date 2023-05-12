import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { cartAdditionState, cartListState } from '../../store/cart';
import { ProductItemData } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import Button from '../common/Button/Button';
import Heading from '../common/Heading/Heading';
import StepperButton from '../common/StepperButton/StepperButton';
import * as S from './ProductAddition.styles';

interface ProductAdditionProps {
  productInformation: ProductItemData;
  handleModalClose: () => void;
}

const ProductAddition = ({ productInformation, handleModalClose }: ProductAdditionProps) => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const setCartAddition = useSetRecoilState(cartAdditionState);
  const [quantity, setQuantity] = useState(1);

  const handleCartAdd = useCallback(() => {
    const compareProductId = productInformation.id;
    const selectedCartItemIndex = cartList.findIndex(
      (cartItem) => cartItem.product.id === compareProductId
    );

    if (selectedCartItemIndex === -1) {
      const newCartId = Number(new Date());
      const newCartItem = {
        id: newCartId,
        quantity,
        product: productInformation,
      };
      setCartList([...cartList, newCartItem]);
    } else {
      const updatedCartList = [...cartList];
      updatedCartList[selectedCartItemIndex] = {
        ...updatedCartList[selectedCartItemIndex],
        quantity: updatedCartList[selectedCartItemIndex].quantity + quantity,
      };
      setCartList(updatedCartList);
      setCartAddition(true);
    }

    handleModalClose();
  }, [cartList, handleModalClose, productInformation, quantity, setCartList, setCartAddition]);

  return (
    <S.ProductAdditionContainer>
      <S.Header>장바구니 담기</S.Header>
      <S.ProductInformationContainer>
        <S.ProductImage src={productInformation.imageUrl} alt={productInformation.name} />
        <div>
          <div>
            <S.ProductName>{productInformation.name}</S.ProductName>
            <S.ProductPrice>{priceFormatter(productInformation.price)}원</S.ProductPrice>
          </div>
          <StepperButton count={quantity} setCount={setQuantity} />
        </div>
      </S.ProductInformationContainer>
      <S.TotalPriceContainer>
        <S.TotalPriceLabel as="h6" id="total-price-label">
          합계
        </S.TotalPriceLabel>
        <Heading aria-labelledby="total-price-label">
          {priceFormatter(productInformation.price * quantity)} 원
        </Heading>
      </S.TotalPriceContainer>
      <S.ButtonContainer>
        <Button aria-label="close modal" onClick={handleModalClose}>
          취소
        </Button>
        <Button variant="primary" aria-label="add item" onClick={handleCartAdd}>
          장바구니 담기
        </Button>
      </S.ButtonContainer>
    </S.ProductAdditionContainer>
  );
};

export default ProductAddition;

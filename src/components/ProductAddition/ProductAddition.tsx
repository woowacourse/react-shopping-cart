import { useCallback } from 'react';

import { DEFAULT_MIN_COUNT } from '../../constants';
import { useCart } from '../../hooks/useCart';
import { useCount } from '../../hooks/useCount';
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
  const { setCartItemQuantity } = useCart();
  const {
    count: quantity,
    handleDecreaseCount,
    handleIncreaseCount,
    handleCountChange,
  } = useCount(DEFAULT_MIN_COUNT);

  const handleCartAdd = useCallback(() => {
    setCartItemQuantity(productInformation.id, quantity);
    handleModalClose();
  }, [handleModalClose, productInformation.id, quantity, setCartItemQuantity]);

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
          <StepperButton
            count={quantity}
            handleDecreaseCount={handleDecreaseCount}
            handleIncreaseCount={handleIncreaseCount}
            handleCountChange={handleCountChange}
          />
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

import { useCallback } from 'react';

import { DEFAULT_MIN_COUNT } from '../../../constants';
import { useCount } from '../../../hooks/common/useCount';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import Heading from '../../common/Heading/Heading';
import StepperButton from '../../common/StepperButton/StepperButton';
import * as S from './ProductAddition.styles';

interface ProductAdditionProps extends ProductItemData {
  addItemQuantity: (productId: number, quantity: number) => Promise<void>;
  handleModalClose: () => void;
}

const ProductAddition = ({
  addItemQuantity,
  handleModalClose,
  ...information
}: ProductAdditionProps) => {
  const {
    count: currentQuantity,
    handleDecreaseCount,
    handleIncreaseCount,
    handleCountChange,
  } = useCount(DEFAULT_MIN_COUNT);

  const handleCartAdd = useCallback(async () => {
    await addItemQuantity(information.id, currentQuantity);
    handleModalClose();
  }, [addItemQuantity, currentQuantity, handleModalClose, information.id]);

  return (
    <>
      <S.ProductAdditionContainer>
        <S.Header>장바구니 담기</S.Header>
        <S.ProductInformationContainer>
          <S.ProductImage src={information.imageUrl} alt={information.name} />
          <div>
            <div>
              <S.ProductName>{information.name}</S.ProductName>
              <S.ProductPrice>{priceFormatter(information.price)}원</S.ProductPrice>
            </div>
            <StepperButton
              count={currentQuantity}
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
            {priceFormatter(information.price * currentQuantity)} 원
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
    </>
  );
};

export default ProductAddition;

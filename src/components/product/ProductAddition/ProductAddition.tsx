import { useCallback, useState } from 'react';

import { DEFAULT_MIN_COUNT } from '../../../constants';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import Heading from '../../common/Heading/Heading';
import StepperButton from '../../common/StepperButton/StepperButton';
import * as S from './ProductAddition.styles';

interface ProductAdditionProps extends ProductItemData {
  addItemQuantity: (variables: { productId: number; quantity: number }) => void;
  handleModalClose: () => void;
}

const ProductAddition = ({
  addItemQuantity,
  handleModalClose,
  ...information
}: ProductAdditionProps) => {
  const [quantity, setQuantity] = useState(DEFAULT_MIN_COUNT);

  const handleQuantityChange = useCallback((updatedQuantity: number) => {
    setQuantity(updatedQuantity);
  }, []);

  const handleCartAdd = useCallback(() => {
    handleModalClose();
    addItemQuantity({ productId: information.id, quantity });
  }, [addItemQuantity, handleModalClose, information.id, quantity]);

  return (
    <>
      <S.ProductAdditionContainer>
        <S.Header id="modal-title">장바구니 담기</S.Header>
        <S.ProductInformationContainer>
          <S.ProductImage src={information.imageUrl} alt={information.name} />
          <div>
            <div>
              <S.ProductName>{information.name}</S.ProductName>
              <S.ProductPrice>{priceFormatter(information.price)}원</S.ProductPrice>
            </div>
            <StepperButton count={quantity} handleCountChange={handleQuantityChange} />
          </div>
        </S.ProductInformationContainer>
        <S.TotalPriceContainer>
          <S.TotalPriceLabel as="h6" id="total-price">
            합계
          </S.TotalPriceLabel>
          <Heading aria-labelledby="total-price">
            {priceFormatter(information.price * quantity)}원
          </Heading>
        </S.TotalPriceContainer>
        <S.ButtonContainer>
          <Button id="cancel-add" onClick={handleModalClose}>
            취소
          </Button>
          <Button id="add-cart" variant="primary" onClick={handleCartAdd}>
            장바구니 담기
          </Button>
        </S.ButtonContainer>
      </S.ProductAdditionContainer>
    </>
  );
};

export default ProductAddition;

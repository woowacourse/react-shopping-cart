import { Stepper } from './Stepper';
import removeIcon from 'assets/remove-icon.png';
import FlexBox from 'components/@common/FlexBox';
import { useCartProduct } from 'hooks/useCartProduct';
import styled from 'styled-components';
import { CartProduct } from 'types/product';
import { renderDefaultThumbnail } from 'utils/image';

type Props = {
  cartProduct: CartProduct;
};

export const CartProductCard = ({ cartProduct }: Props) => {
  const { id, quantity, product } = cartProduct;
  const { name, price, imageUrl } = product;
  const { addCartProduct, decreaseQuantity, increaseQuantity } = useCartProduct(product);

  return (
    <FlexBox height="140px" width="100%" padding="10px 0" gap="10px">
      <FlexBox>
        <Checkbox type="checkbox" />
      </FlexBox>
      <FlexBox width="120px">
        <ProductImage src={imageUrl} alt={name} onError={renderDefaultThumbnail} />
      </FlexBox>
      <FlexBox flex={1}>
        <ProductTitle>{name}</ProductTitle>
      </FlexBox>
      <FlexBox direction="column" height="100%" gap="5px" justify="space-around" align="flex-end">
        <RemoveButton>
          <img src={removeIcon} alt="remove-button" />
        </RemoveButton>
        <StepperWrapper>
          <Stepper
            value={quantity}
            onClickClosed={addCartProduct}
            onClickDecreaseButton={decreaseQuantity}
            onClickIncreaseButton={increaseQuantity}
          />
        </StepperWrapper>
        <ProductPrice>{price.toLocaleString('ko-KR')}원</ProductPrice>
      </FlexBox>
    </FlexBox>
  );
};

const Checkbox = styled.input`
  transform: scale(1.5);
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  filter: brightness(96%);
`;

const ProductTitle = styled.span``;

const RemoveButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;

  img {
    width: 20px;
  }
`;

const StepperWrapper = styled.div``;

const ProductPrice = styled.span``;

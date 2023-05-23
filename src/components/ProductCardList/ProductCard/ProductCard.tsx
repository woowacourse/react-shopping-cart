import FlexBox from 'components/@common/FlexBox';
import { Stepper } from 'components/ProductCardList/ProductCard/Stepper';
import { useCartProduct } from 'hooks/useCartProduct';
import { useRecoilValue } from 'recoil';
import { filteredCartProductState } from 'state/CartAtom';
import styled from 'styled-components';
import type { Product } from 'types/product';
import { formatKoreanCurrency } from 'utils';
import { renderDefaultThumbnail } from 'utils/image';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addCartProduct, decreaseQuantity, increaseQuantity } = useCartProduct(product);
  const { id, price, name, imageUrl } = product;
  const filteredCartProduct = useRecoilValue(filteredCartProductState(id));

  const filteredCartProductQuantity = filteredCartProduct?.quantity ?? 0;

  return (
    <FlexBox direction="column" justify="flex-start" gap="8px" width="200px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} alt={name} onError={renderDefaultThumbnail} />
        <StepperWrapper>
          <Stepper
            value={filteredCartProductQuantity}
            onClickClosed={addCartProduct}
            onClickDecreaseButton={decreaseQuantity}
            onClickIncreaseButton={increaseQuantity}
          />
        </StepperWrapper>
      </ProductImgContainer>
      <FlexBox justify="flex-start" padding="0 4px">
        <FlexBox direction="column" align="flex-start">
          <Title>{name}</Title>
          <Price>{formatKoreanCurrency(price)}원</Price>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  filter: brightness(96%);
`;

const StepperWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 8px;
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

export default ProductCard;

import productThumbnail from 'assets/product-thumbnail.png';
import FlexBox from 'components/@common/FlexBox';
import { Stepper } from 'components/ProductCardList/ProductCard/Stepper';
import { useCartProduct } from 'hooks/useCartProduct';
import { useRecoilValue } from 'recoil';
import { filteredCartProductState } from 'state/CartAtom';
import styled from 'styled-components';
import type { Product } from 'types/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addCartProduct, decreaseQuantity, increaseQuantity } = useCartProduct(product);
  const { id, price, name, imageUrl } = product;
  const filteredCartProduct = useRecoilValue(filteredCartProductState(id));

  const filteredCartProductQuantity = filteredCartProduct?.quantity ?? 0;

  const renderDefaultThumbnail: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = productThumbnail;
  };

  return (
    <FlexBox direction="column" justify="flex-start" gap="8px" role="list">
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
      <FlexBox justify="flex-start" style={{ padding: '0 4px' }}>
        <FlexBox direction="column" align="flex-start">
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')}원</Price>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
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

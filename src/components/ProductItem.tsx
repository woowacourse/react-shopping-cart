import { Typography as ProductPrice } from '../ui/Typography';
import { Image as ProductImage } from '../ui/Image';
import { CartButton } from './CartButton';
import { ProductItem as ProductItemProps } from '../types/productType';
import { useCartState } from './hooks/useCartState';
import * as Styled from './styles/ProductItem.styles';

export const ProductItem = (props: ProductItemProps) => {
  const { id, name, price, imageUrl } = props;

  const { handleAddCartState, handleDeleteCartState } = useCartState(props);

  return (
    <Styled.Wrapper>
      <ProductImage
        $width={'282px'}
        $height={'282px'}
        src={imageUrl}
        alt="상품 이미지"
      />
      <Styled.ProductInfoWrapper>
        <div>
          <Styled.ProductTitle>{name}</Styled.ProductTitle>
          <ProductPrice size="20px">
            {`${price.toLocaleString('ko-KR')} 원`}
          </ProductPrice>
        </div>
        <CartButton
          id={id}
          handleAddCartState={handleAddCartState}
          handleDeleteCartState={handleDeleteCartState}
        />
      </Styled.ProductInfoWrapper>
    </Styled.Wrapper>
  );
};

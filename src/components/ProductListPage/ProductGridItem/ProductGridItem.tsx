import * as Styled from './ProductGridItem.styles';
import shoppingCartDarkSVG from '../../../assets/svgs/shopping-cart-dark.svg';

export interface Props {
  productName: string;
  productPrice: string;
  productThumbnail: string;
}

const ProductGridItem = ({ productName, productPrice, productThumbnail }: Props) => {
  return (
    <Styled.ProductGridItem>
      <Styled.ProductThumbnail src={productThumbnail} />
      <Styled.GridBottomWrapper>
        <Styled.GridTextWrapper>
          <Styled.ProductName>{productName}</Styled.ProductName>
          <Styled.ProductPrice>{productPrice}</Styled.ProductPrice>
        </Styled.GridTextWrapper>
        <Styled.CartIcon src={shoppingCartDarkSVG} />
      </Styled.GridBottomWrapper>
    </Styled.ProductGridItem>
  );
};

export default ProductGridItem;

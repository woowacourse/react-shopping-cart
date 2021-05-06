import * as Styled from './ProductListItem.styles';

export interface Props {
  size: 'SM' | 'MD';
  productThumbnail: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
}

const ProductListItem = ({ size = 'SM', productThumbnail, productName, productPrice, productQuantity }: Props) => {
  return (
    <Styled.ProductListItem>
      <Styled.ProductThumbnail size={size} src={productThumbnail} />
      <Styled.InfoWrapper>
        <Styled.ProductName size={size}>{productName}</Styled.ProductName>
        <Styled.ProductPrice size={size}>
          {productPrice}원 / 수량 : {productQuantity}개
        </Styled.ProductPrice>
      </Styled.InfoWrapper>
    </Styled.ProductListItem>
  );
};

export default ProductListItem;

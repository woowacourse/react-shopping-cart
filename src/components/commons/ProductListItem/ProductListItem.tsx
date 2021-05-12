import * as Styled from './ProductListItem.styles';
import noImagePNG from '../../../assets/images/no-image.png';

export interface Props {
  size: 'SM' | 'MD';
  thumbnail?: string;
  name: string;
  price: string;
  quantity: string;
}

const ProductListItem = ({ size = 'SM', thumbnail = noImagePNG, name, price, quantity }: Props) => {
  return (
    <Styled.ProductListItem>
      <Styled.ProductThumbnail size={size} src={thumbnail} />
      <Styled.InfoWrapper>
        <Styled.ProductName size={size}>{name}</Styled.ProductName>
        <Styled.ProductPrice size={size}>
          {price}원 / 수량 : {quantity}개
        </Styled.ProductPrice>
      </Styled.InfoWrapper>
    </Styled.ProductListItem>
  );
};

export default ProductListItem;

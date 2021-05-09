import * as Styled from './ProductGridItem.styles';
import shoppingCartDarkSVG from '../../../assets/svgs/shopping-cart-dark.svg';

export interface Props {
  id?: string;
  name: string;
  price: string;
  thumbnail: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ProductGridItem = ({ id, name, price, thumbnail, onClick }: Props) => {
  return (
    <Styled.ProductGridItem id={id} onClick={onClick}>
      <Styled.ProductThumbnail src={thumbnail} />
      <Styled.GridBottomWrapper>
        <Styled.GridTextWrapper>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{price} 원</Styled.ProductPrice>
        </Styled.GridTextWrapper>
        <Styled.CartIcon src={shoppingCartDarkSVG} />
      </Styled.GridBottomWrapper>
    </Styled.ProductGridItem>
  );
};

export default ProductGridItem;

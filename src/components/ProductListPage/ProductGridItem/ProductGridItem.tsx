import * as Styled from './ProductGridItem.styles';
import shoppingCartDarkSVG from '../../../assets/svgs/shopping-cart-dark.svg';

export interface Props {
  name: string;
  price: string;
  thumbnail: string;
  onClick?: () => void;
  onClickCartButton?: () => void;
}

const ProductGridItem = ({ name, price, thumbnail, onClick, onClickCartButton }: Props) => {
  const onCartIconClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    onClickCartButton && onClickCartButton();
  };

  return (
    <Styled.ProductGridItem onClick={onClick}>
      <Styled.ProductThumbnail src={thumbnail} />
      <Styled.GridBottomWrapper>
        <Styled.GridTextWrapper>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{price} 원</Styled.ProductPrice>
        </Styled.GridTextWrapper>
        <Styled.CartIcon onClick={onCartIconClick} src={shoppingCartDarkSVG} />
      </Styled.GridBottomWrapper>
    </Styled.ProductGridItem>
  );
};

export default ProductGridItem;

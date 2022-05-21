import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Image, Text } from 'components/@shared';
import { useShoppingBasket } from 'hooks';
import { URL } from 'constants/path';
import STATE_KEY from 'constants/stateKey';
import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

const ItemContainer = styled.div`
  display: grid;
  gap: 5px;
  width: 282px;
  grid-template-areas:
    'img img'
    'name icon'
    'price icon';

  ${Image} {
    overflow: hidden;
    transition: transform 0.5s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
  ${Text}.product-name {
    grid-area: name;
    margin-left: 11px;
    margin-top: 5px;
    cursor: pointer;
  }
  ${Text}.product-price {
    grid-area: price;
    margin-left: 11px;
    cursor: pointer;
  }

  svg {
    grid-area: icon;
    place-self: center end;
    margin-right: 11px;
  }

  path {
    fill: ${({ theme, isContained }) =>
      isContained ? theme.usingColor.selectedShoppingCartIcon : theme.usingColor.shoppingCartIcon};
  }
`;

const ImageWrapper = styled.div`
  grid-area: img;
  overflow: hidden;
`;

function ProductListItem({ id, thumbnail, name, price }) {
  const navigate = useNavigate();

  const { checkIsContainedProduct, addProduct, deleteProducts } = useShoppingBasket(
    STATE_KEY.SHOPPING_BASKET_REDUCER
  );

  const isContained = checkIsContainedProduct(id);

  const handleClickProduct = () => {
    navigate(URL.PRODUCT_DETAIL + id);
  };

  const handleClickShoppingCart = () => {
    isContained ? deleteProducts([id]) : addProduct({ id, thumbnail, name, price });
  };

  return (
    <ItemContainer isContained={isContained}>
      <ImageWrapper onClick={handleClickProduct}>
        <Image type="medium" src={thumbnail} />
      </ImageWrapper>
      <Text className="product-name" fontSize="small">
        {name}
      </Text>
      <Text className="product-price" fontSize="medium">
        {price.toLocaleString('ko-KR')}원
      </Text>
      <ShoppingCart style={{ cursor: 'pointer' }} onClick={handleClickShoppingCart} />
    </ItemContainer>
  );
}

export default ProductListItem;

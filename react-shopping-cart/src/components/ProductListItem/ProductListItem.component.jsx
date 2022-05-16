import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Image, Text } from 'components/@shared';
import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';
import { addItem, deleteItem } from 'actions';

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
  const dispatch = useDispatch();

  const shoppingCart = useSelector(state => state.shoppingCartList);

  const isContained = shoppingCart.find(itemInfo => itemInfo.id === id) !== undefined;

  const handleToggleShoppingCart = () => {
    dispatch(isContained ? deleteItem(id) : addItem(id));
  };

  return (
    <ItemContainer isContained={isContained}>
      <ImageWrapper>
        <Image type="medium" src={thumbnail} />
      </ImageWrapper>
      <Text className="product-name" fontSize="small">
        {name}
      </Text>
      <Text className="product-price" fontSize="medium">
        {price.toLocaleString('ko-KR')}원
      </Text>
      <ShoppingCart style={{ cursor: 'pointer' }} onClick={handleToggleShoppingCart} />
    </ItemContainer>
  );
}

export default ProductListItem;

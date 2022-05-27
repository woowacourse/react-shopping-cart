import * as S from './ListProduct.styles';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'redux/cart/cartActions';

import { Badge, Button } from 'components/@common';

import { addThousandUnitComma } from 'utils';

function ListProduct({ id, image, name, price }) {
  const { products } = useSelector(store => store.cart);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(products.find(product => product.id === id)?.quantity);
  }, [products]);

  const onClickShoppingCartIcon = () => {
    dispatch(addProductToCart(id, image, name, price));
  };

  return (
    <S.ListProduct>
      <S.Image src={image} />
      <S.DescriptionBox>
        <div>
          <S.Name>{name}</S.Name>
          <S.Price>{addThousandUnitComma(price)} 원</S.Price>
        </div>
        <Button onClick={onClickShoppingCartIcon}>
          <S.ShoppingCartIcon>🛒</S.ShoppingCartIcon>
        </Button>
        {quantity && <Badge>{quantity}</Badge>}
      </S.DescriptionBox>
    </S.ListProduct>
  );
}

ListProduct.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ListProduct;

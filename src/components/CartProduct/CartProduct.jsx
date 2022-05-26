import * as S from './CartProduct.styles';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_TYPE from 'redux/cart/cartActions';

import { Button } from 'components/@common';
import { Selector } from 'components';

import { addThousandUnitComma } from 'utils';
import { CART_PRODUCT } from 'constants';

function CartProduct({ id, image, name, quantity, price }) {
  const { checkedProducts } = useSelector(store => store.cart);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setChecked(checkedProducts.find(product => product.id === id) !== undefined);
  }, [checkedProducts]);

  const onChangeSelector = () => {
    dispatch({ type: ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK, payload: { id } });
    setChecked(prevChecked => !prevChecked);
  };

  const onClickDeleteButton = () => {
    dispatch({ type: ACTION_TYPE.REMOVE_PRODUCT_FROM_CART, payload: { id } });
  };

  const onClickQuantityControlButton = ({ target }) => {
    if (target.getAttribute('type') === 'increment') {
      if (quantity >= CART_PRODUCT.MAX_QUANTITY) return;

      dispatch({ type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: { id } });

      return;
    }

    if (quantity <= CART_PRODUCT.MIN_QUANTITY) return;

    dispatch({ type: ACTION_TYPE.SUBTRACT_CART_PRODUCT_QUANTITY, payload: { id } });
  };

  return (
    <S.CartProduct>
      <S.LeftPart>
        <Selector onChange={onChangeSelector} checked={checked} />
        <S.Image src={image} />
        <S.Name>{name}</S.Name>
      </S.LeftPart>
      <S.RightPart>
        <Button onClick={onClickDeleteButton}>
          <S.DeleteButton>🗑</S.DeleteButton>
        </Button>
        <S.QuantityBox>
          <S.Quantity>{quantity}</S.Quantity>
          <Button onClick={onClickQuantityControlButton}>
            <S.QuantityControlButton type="increment">▲</S.QuantityControlButton>
            <S.QuantityControlButton type="decrement">▼</S.QuantityControlButton>
          </Button>
        </S.QuantityBox>
        <S.Price>{addThousandUnitComma(price * quantity)}원</S.Price>
      </S.RightPart>
    </S.CartProduct>
  );
}

CartProduct.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartProduct;

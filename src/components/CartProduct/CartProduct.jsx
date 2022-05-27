import * as S from './CartProduct.styles';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductToCart,
  removeProductFromCart,
  subtractCartProductQuantity,
  toggleCartProductCheck,
} from 'redux/cart/cartActions';

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
    dispatch(toggleCartProductCheck(id));
    setChecked(prevChecked => !prevChecked);
  };

  const onClickDeleteButton = () => {
    dispatch(removeProductFromCart(id));
  };

  const onClickQuantityControlButton = ({ target }) => {
    if (target.getAttribute('type') === 'increment') {
      if (quantity >= CART_PRODUCT.MAX_QUANTITY) return;

      dispatch(addProductToCart(id));

      return;
    }

    if (quantity <= CART_PRODUCT.MIN_QUANTITY) return;

    dispatch(subtractCartProductQuantity(id));
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
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartProduct;

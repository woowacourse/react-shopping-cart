import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_TYPE from 'redux/cart/cartActions';

import { Button } from 'components/@common';
import { Selector } from 'components';

import { addThousandUnitComma, isArrayIncludesObject } from 'utils';
import { CART_PRODUCT } from 'constants';

const CartProductBox = styled.div`
  width: 736px;
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
  border-top: 1.5px solid var(--gray-600);
`;

const LeftBox = styled.div`
  display: flex;
  gap: 15px;
`;

const Image = styled.img`
  width: 144px;
  height: 144px;
  object-fit: cover;
`;

const Name = styled.p`
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: var(--gray-900);
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 15px;
`;

const DeleteButton = styled.div`
  font-size: 20px;
`;

const QuantityBox = styled.div`
  display: flex;
`;

const Quantity = styled.div`
  width: 72px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--gray-500);
  font-size: 24px;
`;

const QuantityControlButton = styled.div`
  height: 30px;
  padding: 4px 12px;
  border: 1px solid var(--gray-500);
  background: var(--white);
  font-size: 100%;

  &:focus {
    outline: none;
  }
`;

const Price = styled.p`
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--gray-900);
`;

function CartProduct({ id, image, name, quantity, price }) {
  const { checkedProducts } = useSelector(store => store.cart);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setChecked(isArrayIncludesObject(checkedProducts, { key: 'id', value: id }));
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
    <CartProductBox>
      <LeftBox>
        <Selector onChange={onChangeSelector} checked={checked} />
        <Image src={image} />
        <Name>{name}</Name>
      </LeftBox>
      <RightBox>
        <Button onClick={onClickDeleteButton}>
          <DeleteButton>🗑</DeleteButton>
        </Button>
        <QuantityBox>
          <Quantity>{quantity}</Quantity>
          <Button onClick={onClickQuantityControlButton}>
            <QuantityControlButton type="increment">▲</QuantityControlButton>
            <QuantityControlButton type="decrement">▼</QuantityControlButton>
          </Button>
        </QuantityBox>
        <Price>{addThousandUnitComma(price * quantity)}원</Price>
      </RightBox>
    </CartProductBox>
  );
}

CartProduct.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartProduct;

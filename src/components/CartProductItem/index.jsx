import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useProduct from 'hooks/useProduct';
import PropTypes from 'prop-types';

import { Image, Counter, CheckBox } from 'components';

import store from 'store/store';
import {
  doDeleteProductFromOrder,
  doPutProductToCart,
  doAddProdcutToOrder,
  doDeleteProductFromCart,
} from 'actions/actionCreator';
import autoComma from 'utils/autoComma';
import Styled from 'components/CartProductItem/index.style';

const CartProductItem = ({ id, quantity }) => {
  const [{ name, price, image }] = useProduct(id);
  const { order } = useSelector(state => state.reducer);
  const [isInOrder, setIsInOrder] = useState(order.some(productId => productId === id));

  const updateOrder = () => {
    if (isInOrder) {
      store.dispatch(doDeleteProductFromOrder({ id }));
      return;
    }

    store.dispatch(doAddProdcutToOrder({ id }));
  };

  useEffect(() => {
    setIsInOrder(order.some(productId => productId === id));
  }, [order, id]);

  return (
    <Styled.Container>
      <Styled.LeftSide>
        <CheckBox checked={isInOrder} handleChange={updateOrder} />
        <Image src={image} alt={name} size="200px" />
        <Styled.ProductName>{name}</Styled.ProductName>
      </Styled.LeftSide>

      <Styled.RightSide>
        <Styled.DeleteButton onClick={() => store.dispatch(doDeleteProductFromCart({ id }))} />
        <Counter
          quantity={quantity}
          increase={() => store.dispatch(doPutProductToCart({ id, quantity: quantity + 1 }))}
          decrease={() => store.dispatch(doPutProductToCart({ id, quantity: quantity - 1 }))}
        />
        {autoComma(price)}원
      </Styled.RightSide>
    </Styled.Container>
  );
};

CartProductItem.propTypes = {
  /**
   * 해당 상품의 id
   */
  id: PropTypes.number.isRequired,
  /**
   * 해당 상품이 장바구니에 담긴 수량
   */
  quantity: PropTypes.number.isRequired,
};

export default CartProductItem;

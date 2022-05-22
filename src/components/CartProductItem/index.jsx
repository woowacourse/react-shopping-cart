import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const { products, order } = useSelector(state => state.reducer);
  const [isInOrder, setIsInOrder] = useState(order.some(productId => productId === id));
  const { name, price, image } = products.find(product => product.id === id);

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
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartProductItem;

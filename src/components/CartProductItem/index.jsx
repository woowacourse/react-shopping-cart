import { useSelector } from 'react-redux';
import Styled from 'components/CartProductItem/index.style';
import { Image } from 'components';
import { ReactComponent as DeleteIcon } from 'assets/trash_can_icon.svg';
import Counter from 'components/Counter';
import autoComma from 'utils/autoComma';
import CheckBox from 'components/CheckBox';
import store from 'store/store';
import {
  doDeleteProductFromOrder,
  doPutProductToCart,
  doAddProdcutToOrder,
  doDeleteProductFromCart,
} from 'actions/actionCreator';
import { useEffect, useState } from 'react';

const CartProductItem = ({ id, quantity }) => {
  const { products, order } = useSelector(state => state.reducer);
  const product = products.find(product => product.id === id);
  const { name, price, image } = product;
  const [isInOrder, setIsInOrder] = useState(order.some(productId => productId === id));

  const toggleOrder = () => {
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
    <Styled.ProductItem>
      <Styled.ProductDetailController>
        <CheckBox checked={isInOrder} handleChange={toggleOrder} />
        <Image src={image} size="200px" />
        <Styled.ProductName>{name}</Styled.ProductName>
      </Styled.ProductDetailController>

      <Styled.ProductController>
        <DeleteIcon onClick={() => store.dispatch(doDeleteProductFromCart({ id }))} />
        <Counter
          quantity={quantity}
          increase={() => store.dispatch(doPutProductToCart({ id, quantity: quantity + 1 }))}
          decrease={() => store.dispatch(doPutProductToCart({ id, quantity: quantity - 1 }))}
        />
        {autoComma(price)}원
      </Styled.ProductController>
    </Styled.ProductItem>
  );
};

export default CartProductItem;

import { FormEvent, useEffect, useState, FC } from 'react';
import { RouteComponentProps } from 'react-router';
import OrderConfirmForm from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import InitialLoading from '../../components/shared/InitialLoading';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetch from '../../hooks/shared/useFetch';
import useCartDeleteItem from '../../hooks/useCartItems/useCartDeleteItem';
import { requestOrderItems } from '../../service/request/order';
import {
  requestClearOrderConfirmItems,
  requestOrderConfirmItems,
} from '../../service/request/orderConfirm';
import { ItemInCart } from '../../types';

const TITLE = '주문/결제';

interface Props extends RouteComponentProps {}

const OrderConfirmPage: FC<Props> = ({ history }) => {
  const { data: items, isLoading } = useFetch(requestOrderConfirmItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const { clearCart } = useCartDeleteItem();

  useEffect(() => {
    if (!items) return;

    const calculatedPrice = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

    setTotalPrice(calculatedPrice);
  }, [items]);

  const order = async () => {
    await requestOrderItems(items as ItemInCart[]);
    await requestClearOrderConfirmItems();
    clearCart();
  };

  const onSubmitOrderConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await order();
      alert('주문이 성공했습니다!');
    } catch (error) {
      console.error(error);
    }

    history.replace('/');
  };

  return (
    <ReactShoppingCartTemplate title={TITLE}>
      <InitialLoading isLoading={isLoading}>
        <OrderConfirmForm onSubmit={onSubmitOrderConfirm}>
          <OrderConfirmSection title="주문 상품" items={items as ItemInCart[]} />
          <OrderConfirmResultSubmitCard totalPrice={totalPrice} />
        </OrderConfirmForm>
      </InitialLoading>
    </ReactShoppingCartTemplate>
  );
};

export default OrderConfirmPage;

import { FormEvent, useEffect, useState, FC } from 'react';
import { RouteComponentProps } from 'react-router';
import OrderConfirmForm from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import RootTemplate from '../../components/shared/RootTemplate';
import useCartDeleteItem from '../../hooks/useCartItems/useCartDeleteItem';
import { clearCartItemAdditionalDataInLocalStorage } from '../../service/localStorage/cart';
import { getOrderConfirmItemsInLocalStorage } from '../../service/localStorage/orderConfirm';
import { requestOrderItemListToRegister } from '../../service/request/order';
import { CartItem } from '../../types';

const TITLE = '주문/결제';

interface Props extends RouteComponentProps {}

const OrderConfirmPage: FC<Props> = ({ history }) => {
  const items = getOrderConfirmItemsInLocalStorage();
  const [totalPrice, setTotalPrice] = useState(0);
  const { clearCart } = useCartDeleteItem();

  useEffect(() => {
    if (!items) return;

    const calculatedPrice = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

    setTotalPrice(calculatedPrice);
  }, [items]);

  const onSubmitOrderConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await requestOrderItemListToRegister(items as CartItem[]);
      //TODO: 여기서 에러처리 고민하기 - clearCart에서 오류날 경우 여기서 catch되지 않음
      clearCart();

      alert('주문이 성공했습니다!');
    } catch (error) {
      console.error(error);
    }

    history.replace('/');
  };

  return (
    <RootTemplate title={TITLE}>
      <OrderConfirmForm onSubmit={onSubmitOrderConfirm}>
        <OrderConfirmSection title="주문 상품" items={items as CartItem[]} />
        <OrderConfirmResultSubmitCard totalPrice={totalPrice} />
      </OrderConfirmForm>
    </RootTemplate>
  );
};

export default OrderConfirmPage;

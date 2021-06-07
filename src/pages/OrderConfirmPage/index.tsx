import { FormEvent, useEffect, useState, FC } from 'react';
import { RouteComponentProps } from 'react-router';
import OrderConfirmForm from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import RootTemplate from '../../components/shared/RootTemplate';
import useCartDeleteItem from '../../hooks/useCartItems/useCartDeleteItem';
import { getOrderConfirmItemsInLocalStorage } from '../../service/localStorage/orderConfirm';
import { requestOrderItemListToRegister } from '../../service/request/order';
import { CartItem } from '../../types';
import { unwrapResult } from '@reduxjs/toolkit';
import { ERROR_TYPE } from '../../constants/error';
import { ALERT } from '../../constants/message';
import CustomError from '../../utils/CustomError';

const TITLE = '주문/결제';

interface Props extends RouteComponentProps {}

const OrderConfirmPage: FC<Props> = ({ history }) => {
  const items = getOrderConfirmItemsInLocalStorage();
  const [totalPrice, setTotalPrice] = useState(0);
  const { clearCart } = useCartDeleteItem();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    throw new CustomError(ERROR_TYPE.NETWORK, errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (!items) return;

    const calculatedPrice = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

    setTotalPrice(calculatedPrice);
  }, [items]);

  const onSubmitOrderConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await requestOrderItemListToRegister(items as CartItem[]);
      const resultAction: any = await clearCart();
      unwrapResult(resultAction);

      alert(ALERT.SUCCESS_ORDER);
    } catch (error) {
      setErrorMessage(error.message);
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

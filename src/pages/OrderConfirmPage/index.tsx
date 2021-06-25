import { FC, FormEvent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import OrderConfirmForm from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import RootTemplate from '../../components/shared/RootTemplate';
import { ERROR_TYPE } from '../../constants/error';
import { ALERT } from '../../constants/message';
import { clearCartItemAdditionalData } from '../../service/cart';
import { registerOrderItemList } from '../../service/order';
import { getOrderConfirmItems } from '../../service/orderConfirm';
import { CartItem } from '../../types';
import CustomError from '../../utils/CustomError';

const TITLE = '주문/결제';

interface Props extends RouteComponentProps {}

const OrderConfirmPage: FC<Props> = ({ history }) => {
  const items = getOrderConfirmItems();
  const [totalPrice, setTotalPrice] = useState(0);
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
      await registerOrderItemList(items as CartItem[]);
      clearCartItemAdditionalData();

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

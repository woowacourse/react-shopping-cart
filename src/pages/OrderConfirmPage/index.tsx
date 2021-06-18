import { FormEvent, useEffect, VFC } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router';
import Loading from '../../components/Loading';
import OrderConfirmForm from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import Template from '../../components/shared/Template';
import useCart from '../../service/hooks/useCart';
import useFetch from '../../service/hooks/useFetch';
import useLogin from '../../service/hooks/useLogin';
import { requestOrderItems } from '../../service/request/order';
import { CartItem } from '../../types';

const TITLE = '주문/결제';

interface Props {}

const OrderConfirmPage: VFC<Props> = () => {
  const history = useHistory();
  const { checkedCartItems, isLoading, totalPrice } = useCart();
  const { userName } = useLogin();

  const order = useFetch(() => requestOrderItems(userName, checkedCartItems), {
    isMutation: true,
  });

  useErrorHandler(order.error);

  const onSubmitOrderConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    order.fetch();
  };

  useEffect(() => {
    if (order.isSuccess) {
      alert('주문이 성공했습니다!');
      history.replace('/');
    }
  }, [order.isSuccess]);

  return (
    <Template title={TITLE}>
      <OrderConfirmForm onSubmit={onSubmitOrderConfirm}>
        <Loading isLoading={isLoading}>
          <OrderConfirmSection title="주문 상품" items={checkedCartItems as CartItem[]} />
        </Loading>

        <OrderConfirmResultSubmitCard totalPrice={totalPrice} />
      </OrderConfirmForm>
    </Template>
  );
};

export default OrderConfirmPage;

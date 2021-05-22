import { FormEvent, VFC } from 'react';
import { RouteComponentProps } from 'react-router';
import Loading from '../../components/Loading';
import OrderConfirmForm from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import Template from '../../components/shared/Template';
import useCart from '../../hooks/useCart';
import useLogin from '../../hooks/useLogin';
import { requestOrderItems } from '../../service/request/order';
import { CartItem } from '../../types';

const TITLE = '주문/결제';

interface Props extends RouteComponentProps {}

const OrderConfirmPage: VFC<Props> = ({ history }) => {
  const { checkedCartItems, isLoading, totalPrice } = useCart();
  const { userName } = useLogin();

  const order = async () => {
    try {
      await requestOrderItems(userName, checkedCartItems as CartItem[]);
    } catch (error) {
      throw error;
    }
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
    <Template title={TITLE}>
      <OrderConfirmForm onSubmit={onSubmitOrderConfirm}>
        {isLoading ? (
          <Loading />
        ) : (
          <OrderConfirmSection title="주문 상품" items={checkedCartItems as CartItem[]} />
        )}
        <OrderConfirmResultSubmitCard totalPrice={totalPrice} />
      </OrderConfirmForm>
    </Template>
  );
};

export default OrderConfirmPage;

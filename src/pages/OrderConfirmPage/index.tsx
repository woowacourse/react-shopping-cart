import OrderConfirmInnerContainer from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import { INNER_TEMPLATE_WIDTH } from '../../constants/style';
import { ORDER_LIST_MOCK } from '../../mock';

const TITLE = '주문/결제';

const OrderConfirmPage = () => {
  return (
    <ReactShoppingCartTemplate title={TITLE}>
      <OrderConfirmInnerContainer>
        <OrderConfirmSection title="주문 상품" items={ORDER_LIST_MOCK} />
        <OrderConfirmResultSubmitCard />
      </OrderConfirmInnerContainer>
    </ReactShoppingCartTemplate>
  );
};

export default OrderConfirmPage;

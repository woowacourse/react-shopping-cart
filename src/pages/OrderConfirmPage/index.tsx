import OrderConfirmInnerContainer from '../../components/OrderConfirm/OrderConfirmInnerContainer';
import OrderConfirmResultSubmitCard from '../../components/OrderConfirm/OrderConfirmResultSubmitCard';
import OrderConfirmSection from '../../components/OrderConfirm/OrderConfirmSection';
import ResultSubmitCard from '../../components/shared/ResultSubmitCard';
import Template from '../../components/shared/Template';
import { INNER_TEMPLATE_WIDTH } from '../../constants/style';
import { ORDER_LIST_MOCK } from '../../mock';

const TITLE = '주문/결제';

const OrderConfirmPage = () => {
  return (
    <Template title={TITLE} innerWidth={INNER_TEMPLATE_WIDTH}>
      <OrderConfirmInnerContainer>
        <OrderConfirmSection title="주문 상품" items={ORDER_LIST_MOCK} />
        <OrderConfirmResultSubmitCard />
      </OrderConfirmInnerContainer>
    </Template>
  );
};

export default OrderConfirmPage;

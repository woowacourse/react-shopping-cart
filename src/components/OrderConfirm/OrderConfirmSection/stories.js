import OrderConfirmSection from '.';
import { ORDER_LIST_MOCK } from '../../../mocks/mockData';

export default {
  component: OrderConfirmSection,
  title: 'components/OrderConfirm/OrderConfirmSection',
};

const StoryTemplate = (args) => <OrderConfirmSection {...args} />;

export const Default = StoryTemplate.bind({});

Default.args = {
  title: '주문 상품',
  items: ORDER_LIST_MOCK,
};

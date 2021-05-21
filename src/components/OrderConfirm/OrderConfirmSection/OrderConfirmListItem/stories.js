import OrderItem from '.';
import { ORDER_LIST_MOCK, PRODUCT_LIST_MOCK } from '../../../../mocks/mockData';

export default {
  component: OrderItem,
  title: 'components/OrderConfirm/OrderConfirmSection/OrderItem',
};

const StoryTemplate = (args) => <OrderItem {...args} />;

export const Default = StoryTemplate.bind({});

Default.args = {
  item: ORDER_LIST_MOCK[0].items[0],
};

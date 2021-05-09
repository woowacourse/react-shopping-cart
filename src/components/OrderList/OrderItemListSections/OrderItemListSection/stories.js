import OrderItemListSection from '.';
import { ORDERS_MOCK } from '../../../../mocks/mockData';

export default {
  component: OrderItemListSection,
  title: 'components/OrderList/OrderItemListSection',
};

const Template = (args) => <OrderItemListSection {...args} />;

export const Default = Template.bind({});

Default.args = {
  order: ORDERS_MOCK[0],
};

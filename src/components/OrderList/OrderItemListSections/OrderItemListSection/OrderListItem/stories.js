import OrderListItem from '.';
import { ORDER_LIST_MOCK } from '../../../../../mock';

export default {
  component: OrderListItem,
  title: 'components/OrderList/OrderListItem',
};

const Template = (args) => <OrderListItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  item: ORDER_LIST_MOCK[0],
};

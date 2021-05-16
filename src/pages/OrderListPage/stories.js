import OrderListPage from '.';
import { ORDERS_MOCK } from '../../mocks/mockData';

export default {
  component: OrderListPage,
  title: 'pages/OrderListPage',
};

const Template = (args) => <OrderListPage {...args} />;

export const Default = Template.bind({});

Default.args = {};

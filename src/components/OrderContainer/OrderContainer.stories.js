import RowProductItem from '../ProductItem/RowProductItem/RowProductItem';
import OrderContainer from './OrderContainer';

export default {
  title: 'ShoppingCart/OrderContainer',
  component: OrderContainer,
};

const Template = ({ ...args }) => <OrderContainer {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  orderId: '1',
  children: (
    <>
      <RowProductItem name="a" amount="100" />
      <RowProductItem name="b" amount="100" />
      <RowProductItem name="c" amount="100" />
      <RowProductItem name="d" amount="100" />
    </>
  ),
};

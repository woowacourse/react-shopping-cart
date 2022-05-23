import QuantityController from '.';

export default {
  title: 'Components/QuantityController',
  component: QuantityController,
};

const Template = args => <QuantityController {...args} />;

export const QuantityControllerTemplate = Template.bind({});
QuantityControllerTemplate.args = {
  quantity: 0,
  increase: () => {},
  decrease: () => {},
  handleClick: () => {},
};

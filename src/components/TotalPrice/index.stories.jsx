import TotalPrice from '.';

export default {
  title: 'Components/TotalPrice',
  component: TotalPrice,
};

const Template = args => <TotalPrice {...args} />;

export const TotalPriceTemplate = Template.bind({});
TotalPriceTemplate.args = {
  title: '결제예상금액',
  price: 100000,
  action: '주문하기',
};

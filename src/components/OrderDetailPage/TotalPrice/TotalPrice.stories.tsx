import TotalPrice, { Props } from './TotalPrice';

export default {
  title: 'Components/OrderDetailPage/TotalPrice',
  component: TotalPrice,
  argTypes: {},
};

const Template = (args: Props) => <TotalPrice {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  title: '결제금액',
  priceLabel: '총 결제금액',
  price: '18,900원',
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import PaymentBox from 'components/common/PaymentBox';

export default {
  component: PaymentBox,
  title: 'PaymentBox',
} as ComponentMeta<typeof PaymentBox>;

const Template = args => <PaymentBox {...args} />;

export const Default: ComponentStory<typeof PaymentBox> = Template.bind({});
Default.args = {
  title: '결제예상금액',
  priceDescription: '결제예상금액',
  price: 21700,
  buttonText: '주문하기(2개)',
};

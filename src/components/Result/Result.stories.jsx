import Result from './Result';

export default {
  title: 'Components/Result',
  component: Result,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <Result {...args} />;

const ShoppingCartResult = Template.bind({});

ShoppingCartResult.args = {
  title: '결제예상금액',
  price: 21700,
  button: '주문하기(2개)',
};

export { ShoppingCartResult };

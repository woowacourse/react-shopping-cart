import NavigateButton from 'components/@shared/Button/NavigateButton';

export default {
  title: 'NavigateButton',
  component: NavigateButton,
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'black',
          width: '200px',
          height: '100px',
          textAlign: 'center',
          lineHeight: '100px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <NavigateButton {...args}></NavigateButton>;

export const ShoppingCartNavigateButton = Template.bind({});
ShoppingCartNavigateButton.args = {
  children: '장바구니',
};

export const OrderListNavigateButton = Template.bind({});
OrderListNavigateButton.args = {
  children: '주문목록',
};

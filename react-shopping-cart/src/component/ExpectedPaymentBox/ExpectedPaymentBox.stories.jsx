import ExpectedPaymentBox from 'component/ExpectedPaymentBox';

export default {
  title: 'ExpectedPaymentBox',
  component: ExpectedPaymentBox,
  decorators: [
    (Story) => (
      <div style={{ width: '298px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DefaultExpectedPaymentBox = (args) => (
  <ExpectedPaymentBox {...args}>결제 예상 금액</ExpectedPaymentBox>
);

DefaultExpectedPaymentBox.args = {
  price: '21,200',
};

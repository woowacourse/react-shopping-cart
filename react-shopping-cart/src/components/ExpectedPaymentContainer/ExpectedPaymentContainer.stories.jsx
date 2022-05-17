import ExpectedPaymentContainer from 'components/ExpectedPaymentContainer/ExpectedPaymentContainer';

export default {
  title: 'ExpectedPaymentContainer',
  component: ExpectedPaymentContainer,
  decorators: [
    (Story) => (
      <div style={{ width: '298px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DefaultExpectedPaymentContainer = (args) => (
  <ExpectedPaymentContainer {...args} />
);

import AmountController from 'components/CartPage/AmountController';

export default {
  title: 'AmountController',
  component: AmountController,
};

function Template() {
  return <AmountController />;
}

export const DefaultController = Template.bind({});

DefaultController.args = {};

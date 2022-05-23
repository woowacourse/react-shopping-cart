import Counter from '.';

export default {
  title: 'Components/Counter',
  component: Counter,
};

const Template = args => <Counter {...args} />;

export const CounterTemplate = Template.bind({});

CounterTemplate.args = {
  quantity: 5,
  increase: () => {},
  decrease: () => {},
};

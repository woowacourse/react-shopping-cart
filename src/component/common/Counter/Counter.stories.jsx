import Counter from '.';

export default {
  title: 'Component/Common/Counter',
  component: Counter,
};

const Template = args => <Counter {...args} />;

export const Default = Template.bind({});

Default.args = {
  count: 1,
};

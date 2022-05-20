import Circle from './Circle';

export default {
  title: 'components/Circle',
  component: Circle,
};

const Template = (args) => <Circle {...args} />;

export const Example = Template.bind({});
Example.args = {
  children: 3,
};

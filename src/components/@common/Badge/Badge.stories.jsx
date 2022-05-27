import Badge from './Badge';

export default {
  title: 'Components/@Common/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <Badge {...args} />;

const DefaultBadge = Template.bind({});

DefaultBadge.args = {
  children: '10',
};

export { DefaultBadge };

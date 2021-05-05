import NavigationBar from '.';

export default {
  component: NavigationBar,
  title: 'components/NavigationBar',
};

const Template = (args) => <NavigationBar {...args} />;

export const Default = Template.bind({});

Default.args = {};

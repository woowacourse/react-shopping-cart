import NavBar from './NavBar';

export default {
  title: 'Component/NavBar',
  component: NavBar,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <NavBar {...args} />;

const DefaultNavBar = Template.bind({});

export { DefaultNavBar };

import { NavBar } from 'component';

export default {
  title: 'Component/NavBar',
  component: NavBar,
};

const Template = args => <NavBar {...args} />;

const DefaultNavBar = Template.bind({});

export { DefaultNavBar };

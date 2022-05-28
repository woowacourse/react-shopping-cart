import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

export default {
  title: 'Components/NavBar',
  component: NavBar,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <NavBar {...args} />;

const DefaultNavBar = Template.bind({});

export { DefaultNavBar };

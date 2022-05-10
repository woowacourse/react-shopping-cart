import Header from './Header';
import Logo from '../../Logo/Logo';

export default {
  title: 'Layout/Header',
  component: Header,
};

function Template({ children, ...args }) {
  return <Header {...args}>{children}</Header>;
}

export const Default = Template.bind({});
Default.args = {
  children: <Logo />,
};

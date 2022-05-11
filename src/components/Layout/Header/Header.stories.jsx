import PlainLink from '../../../styles/PlainLink';
import Header from './Header';
import Logo from '../../Logo/Logo';

export default {
  title: 'Layout/Header',
  component: Header,
};

function Template(args) {
  return <Header {...args} />;
}

export const Default = Template.bind({});

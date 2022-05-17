import Header from './Header';

export default {
  title: 'Layout/Header',
  component: Header,
};

function Template(args) {
  return <Header {...args} />;
}

export const Default = Template.bind({});

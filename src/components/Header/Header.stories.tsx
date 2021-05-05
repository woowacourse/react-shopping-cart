import Header from './Header';

export default {
  title: 'Commons/Header',
  component: Header,
  argTypes: {},
};

const Template = (args: any) => <Header {...args} />;

export const Default = Template.bind({});

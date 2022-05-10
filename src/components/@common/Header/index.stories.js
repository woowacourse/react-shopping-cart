import Header from '.';

export default {
  title: 'Component/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Header {...args} />;

export const DefaultTemplate = Template.bind({});

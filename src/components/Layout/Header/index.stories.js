import Header from '.';

export default {
  title: 'Component/Layout/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Header {...args} />;

export const DefaultTemplate = Template.bind({});
DefaultTemplate.parameters = {
  controls: { hideNoControlsWarning: true },
};

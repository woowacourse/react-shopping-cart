import Footer from '.';

export default {
  title: 'Component/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Footer {...args} />;

export const DefaultTemplate = Template.bind({});
DefaultTemplate.parameters = {
  controls: { hideNoControlsWarning: true },
};

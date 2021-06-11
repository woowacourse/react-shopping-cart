import ErrorFallbackPopup from '.';

export default {
  component: ErrorFallbackPopup,
  title: 'components/ErrorFallback/ErrorFallbackPopup',
};

const Template = (args) => <ErrorFallbackPopup {...args} />;

export const Default = Template.bind({});

Default.args = {
  header: 'HEADER',
  description: 'DESCRIPTION',
  buttonText: 'BUTTON',
};

import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <LoadingSpinner {...args} />;

const DefaultLoadingSpinner = Template.bind({});

export { DefaultLoadingSpinner };

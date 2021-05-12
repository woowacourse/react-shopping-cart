import NetworkError from '.';

export default {
  component: NetworkError,
  title: 'components/ErrorBoundary/NetworkError',
};

const Template = (args) => <NetworkError {...args} />;

export const Default = Template.bind({});

Default.args = {};

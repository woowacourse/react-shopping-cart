import CommonError from '.';

export default {
  component: CommonError,
  title: 'components/ErrorBoundary/CommonError',
};

const Template = (args) => <CommonError {...args} />;

export const Default = Template.bind({});

Default.args = {};

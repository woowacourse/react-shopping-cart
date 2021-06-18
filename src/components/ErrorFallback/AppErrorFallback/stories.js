import CommonError from '.';

export default {
  component: CommonError,
  title: 'components/ErrorFallback/AppErrorFallback',
};

const Template = (args) => <CommonError {...args} />;

export const Default = Template.bind({});

Default.args = {};

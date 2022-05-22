import LoadingSpinner from '.';

export default {
  title: 'Component/Common/LoadingSpinner',
  component: LoadingSpinner,
};

const Template = args => <LoadingSpinner {...args} />;

export const Default = Template.bind({});

Default.args = {};

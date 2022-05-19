import LoadingSpinner from '.';

export default {
  title: 'Component/LoadingSpinner',
  component: LoadingSpinner,
};

const Template = args => <LoadingSpinner {...args} />;

export const Default = Template.bind({});

Default.args = {};

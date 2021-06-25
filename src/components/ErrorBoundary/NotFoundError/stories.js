import NotFoundError from '.';

export default {
  component: NotFoundError,
  title: 'components/ErrorBoundary/NotFoundError',
};

const Template = (args) => <NotFoundError {...args} />;

export const Default = Template.bind({});

Default.args = {};

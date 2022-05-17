import ErrorPage from ".";

export default {
  title: "Pages",
  component: ErrorPage,
};

const Template = (args) => <ErrorPage {...args} />;

export const ErrorPageTemplate = Template.bind({});
ErrorPageTemplate.args = {};

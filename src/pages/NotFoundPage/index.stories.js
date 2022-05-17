import NotFoundPage from ".";

export default {
  title: "Pages",
  component: NotFoundPage,
};

const Template = (args) => <NotFoundPage {...args} />;

export const NotFoundPageTemplate = Template.bind({});
NotFoundPageTemplate.args = {};

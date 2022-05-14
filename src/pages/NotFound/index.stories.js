import NotFound from ".";

export default {
  title: "Page",
  component: NotFound,
};

const Template = (args) => <NotFound {...args} />;

export const NotFoundTemplate = Template.bind({});
NotFoundTemplate.args = {};

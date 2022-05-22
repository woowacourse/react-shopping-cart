import Header from ".";

export default {
  title: "Presentional",
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const HeaderTemplate = Template.bind({});
HeaderTemplate.args = {};

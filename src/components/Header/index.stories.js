import Header from ".";

export default {
  title: "Presentational",
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const HeaderTemplate = Template.bind({});
HeaderTemplate.args = {};

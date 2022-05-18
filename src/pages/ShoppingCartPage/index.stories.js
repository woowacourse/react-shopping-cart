import ShoppingCartPage from ".";

export default {
  title: "Pages",
  component: ShoppingCartPage,
};

const Template = (args) => <ShoppingCartPage {...args} />;
export const ShoppingCartPageTemplate = Template.bind({});
ShoppingCartPageTemplate.args = {};

import ProductListPage from ".";

export default {
  title: "Pages",
  component: ProductListPage,
};

const Template = (args) => <ProductListPage {...args} />;

export const ProductListPageTemplate = Template.bind({});
ProductListPageTemplate.args = {};

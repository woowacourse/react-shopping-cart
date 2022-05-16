import ProductDetailsSkeleton from ".";

export default {
  title: "Presentational",
  component: ProductDetailsSkeleton,
};

const Template = (args) => <ProductDetailsSkeleton {...args} />;

export const ProductDetailsSkeletonTemplate = Template.bind({});
ProductDetailsSkeletonTemplate.args = {};

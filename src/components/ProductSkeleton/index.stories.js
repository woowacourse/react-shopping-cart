import ProductSkeleton from ".";

export default {
  title: "Presentational",
  component: ProductSkeleton,
};

const Template = (args) => <ProductSkeleton {...args} />;
export const ProductSkeletonTemplate = Template.bind({});
ProductSkeletonTemplate.args = {};

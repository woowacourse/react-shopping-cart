import ItemDetailsSkeleton from ".";

export default {
  title: "Presentational",
  component: ItemDetailsSkeleton,
};

const Template = (args) => <ItemDetailsSkeleton {...args} />;

export const ItemDetailsSkeletonTemplate = Template.bind({});
ItemDetailsSkeletonTemplate.args = {};

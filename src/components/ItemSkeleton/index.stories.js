import ItemSkeleton from ".";

export default {
  title: "Presentational",
  component: ItemSkeleton,
};

const Template = (args) => <ItemSkeleton {...args} />;
export const ItemSkeletonTemplate = Template.bind({});
ItemSkeletonTemplate.args = {};

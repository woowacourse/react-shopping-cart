import ItemSkeleton from ".";

export default {
  title: "Presentional",
  component: ItemSkeleton,
};

const Template = (args) => <ItemSkeleton {...args} />;
export const SkeletonTemplate = Template.bind({});
SkeletonTemplate.args = {};

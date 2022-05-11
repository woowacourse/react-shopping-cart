import ItemSkeleton from ".";

export default {
  title: "Component",
  component: ItemSkeleton,
};

const Template = (args) => <ItemSkeleton {...args} />;
export const SkeletonTemplate = Template.bind({});
SkeletonTemplate.args = {};

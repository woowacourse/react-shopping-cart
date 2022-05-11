import Skeleton from ".";

export default {
  title: "Component",
  component: Skeleton,
};

const Template = (args) => <Skeleton {...args} />;
export const SkeletonTemplate = Template.bind({});
SkeletonTemplate.args = { width: "500px", height: "300px" };

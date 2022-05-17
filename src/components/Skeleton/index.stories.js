import Skeleton from ".";

export default {
  title: "Presentational",
  component: Skeleton,
};

const Template = (args) => <Skeleton {...args} />;
export const SkeletonTemplate = Template.bind({});
SkeletonTemplate.args = { width: "500px", height: "300px" };

import SkeletonList from 'components/SkeletonList';

export default {
  title: 'components/SkeletonList',
  component: SkeletonList,
};

const Template = (args) => <SkeletonList {...args} />;

export const Example = Template.bind({});
Example.args = {
  length: 8,
};

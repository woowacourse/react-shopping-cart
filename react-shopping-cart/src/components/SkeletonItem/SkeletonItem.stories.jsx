import SkeletonItem from './SkeletonItem.component';

export default {
  title: 'Components/SkeletonItem',
  component: SkeletonItem,
};

export const DefaultSkeletonItem = args => <SkeletonItem {...args} />;
DefaultSkeletonItem.args = {};

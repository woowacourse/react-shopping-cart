import Skeleton from './Skeleton.component';

export default {
  title: 'Shared/Skeleton',
  component: Skeleton,
};

export const DefaultSkeleton = args => <Skeleton {...args} />;
DefaultSkeleton.args = { width: '200px', height: '50px' };

import Skeleton from 'components/Common/Skeleton/Skeleton';
import { skeletonSize } from './style';

export default {
  title: 'components/Skeleton',
  component: Skeleton,
  argTypes: {
    sizeType: {
      options: Object.keys(skeletonSize),
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => <Skeleton {...args} />;

export const Large = Template.bind({});
Large.args = {
  sizeType: 'large',
};

export const Small = Template.bind({});
Small.args = {
  sizeType: 'small',
};

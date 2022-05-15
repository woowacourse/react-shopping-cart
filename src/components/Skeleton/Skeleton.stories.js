import Skeleton from 'components/Skeleton/Skeleton';

export default {
  title: 'components/Skeleton',
  component: Skeleton,
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

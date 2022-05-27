import Button from 'components/Button';

export default {
  title: 'components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Example = Template.bind({});

Example.args = {
  sizeType: 'large',
  colorType: 'primary',
  children: '장바구니',
};

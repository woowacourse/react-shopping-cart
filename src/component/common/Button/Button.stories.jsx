import Button from 'component/common/Button';

export default {
  title: 'Component/Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <Button {...args} />;

const DefaultButton = Template.bind({});

DefaultButton.args = {
  children: '장바구니',
};

export { DefaultButton };

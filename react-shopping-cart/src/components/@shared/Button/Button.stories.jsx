import Button from './Button.component';

export default {
  title: 'Shared/Button',
  component: Button,
};

export const DefaultButton = args => <Button {...args}>주문하기</Button>;
DefaultButton.args = {
  width: '388px',
  height: '74px',
};

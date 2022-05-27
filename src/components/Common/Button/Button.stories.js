import Button from 'components/Common/Button/Button';
import { buttonSize, buttonColor } from './style';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    sizeType: {
      options: Object.keys(buttonSize),
      control: { type: 'radio' },
    },
    colorType: {
      options: Object.keys(buttonColor),
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Example = Template.bind({});

Example.args = {
  sizeType: 'large',
  colorType: 'primary',
  children: '장바구니',
};

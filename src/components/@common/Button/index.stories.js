import { ICON_CODE } from 'constants/';
import Button from './index';

export default {
  title: 'Component/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      options: ['', 'f787', 'f07a'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = { type: 'button', children: 'Button' };

export const IconButton = Template.bind({});
IconButton.args = { type: 'button', icon: ICON_CODE.CARROT };

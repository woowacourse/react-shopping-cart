import { ICON_CODE } from 'constants/';

import Button from './index';

export default {
  title: 'Component/@Common/Button',
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

export const PrimaryButton = Template.bind({});
PrimaryButton.args = { type: 'button', state: 'primary', children: 'Button' };

export const IconButton = Template.bind({});
IconButton.args = { type: 'button', icon: ICON_CODE.CARROT };

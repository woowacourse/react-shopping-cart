import { ICON_CODE } from 'constants/';

import Icon from './index';

export default {
  title: 'Component/@Common/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

const Template = (args) => <Icon {...args} />;

export const DefaultIcon = Template.bind({});
DefaultIcon.args = { icon: ICON_CODE.CART, size: '24' };

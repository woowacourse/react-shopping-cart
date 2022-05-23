import Checkbox from './index';

export default {
  title: 'Component/@Common/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: {
      options: ['large', 'medium', 'small', '16', '24', '14'],
      control: { type: 'input' },
    },
  },
};

const Template = (args) => <Checkbox {...args} />;

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = { children: '체크 박스', size: 'medium', checked: true };

export const NumberSize = Template.bind({});
NumberSize.args = { children: '체크 박스', size: '42', checked: true };

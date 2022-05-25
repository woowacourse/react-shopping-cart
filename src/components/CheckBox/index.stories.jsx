import { useState } from 'react';
import CheckBox from '.';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  argTypes: {
    checked: { control: false },
  },
};

const Template = args => {
  const [checked, setChecked] = useState(true);

  return <CheckBox {...args} checked={checked} handleChange={() => setChecked(prev => !prev)} />;
};

export const CheckBoxTemplate = Template.bind({});
CheckBoxTemplate.args = {};

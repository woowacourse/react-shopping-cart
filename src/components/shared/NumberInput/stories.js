import NumberInput from '.';
import { useState } from 'react';

export default {
  component: NumberInput,
  title: 'components/shared/NumberInput',
};

const Template = (args) => {
  const [value, setValue] = useState(0);

  return <NumberInput value={value} setValue={setValue} {...args} />;
};

export const Default = Template.bind({});

Default.args = {};

const Template2 = (args) => {
  const [value, setValue] = useState(20);

  return <NumberInput value={value} setValue={setValue} {...args} />;
};

export const HasMinMax = Template2.bind({});

HasMinMax.args = {
  min: 10,
  max: 30,
};

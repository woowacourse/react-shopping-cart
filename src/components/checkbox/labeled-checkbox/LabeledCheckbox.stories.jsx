import React from 'react';
import LabeledCheckbox from "@shared/checkbox/labeled-checkbox/LabeledCheckbox";

export default {
  title: "Checkbox/LabeledCheckbox",
  component: LabeledCheckbox,
  argTypes: {},
};

const Template = (args) => <LabeledCheckbox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  id: 'input-id',
  label: '라벨입니다',
};

Primary.argTypes = {
  id: { control: { disable: true } },
};


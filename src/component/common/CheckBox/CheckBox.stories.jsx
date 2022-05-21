import CheckBox from '.';

export default {
  title: 'Component/Common/CheckBox',
  component: CheckBox,
};

const Template = args => <CheckBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  description: '설명란',
  checked: true,
};

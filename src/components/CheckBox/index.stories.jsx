import CheckBox from '.';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
};

const Template = args => <CheckBox {...args} />;

export const CheckBoxTemplate = Template.bind({});
CheckBoxTemplate.args = {
  checked: true,
  handleChange: () => {},
};

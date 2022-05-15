import CheckBox from 'components/@shared/CheckBox/CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
};

export const DefaultCheckBox = (args) => <CheckBox {...args} />;
DefaultCheckBox.args = {
  type: 'checkbox',
};

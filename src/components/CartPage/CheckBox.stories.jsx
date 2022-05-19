import CheckBox from 'components/CartPage/CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
};

function Template(args) {
  return <CheckBox {...args} />;
}

export const ChekedBox = Template.bind({});

ChekedBox.args = {
  checked: true,
};

export const UnchekedBox = Template.bind({});

UnchekedBox.args = {
  checked: false,
};

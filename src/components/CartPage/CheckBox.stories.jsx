import CheckBox from 'components/CartPage/CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
  argTypes: {
    updateList: {
      table: {
        disable: true,
      },
    },
  },
};

function Template(args) {
  return <CheckBox {...args} />;
}

export const ChekedBox = Template.bind({});

ChekedBox.args = {
  checked: true,
  onChange: () => {},
};

export const UnchekedBox = Template.bind({});

UnchekedBox.args = {
  checked: false,
  onChange: () => {},
};

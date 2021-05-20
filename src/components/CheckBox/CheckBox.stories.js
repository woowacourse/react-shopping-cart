import CheckBox from './CheckBox';

export default {
  title: 'ShoppingCart/CheckBox',
  component: CheckBox,
  argTypes: { children: { control: 'text' } },
};

const Template = args => <CheckBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {};

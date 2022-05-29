import CheckBox from '.';

export default {
  title: 'Component/Common/CheckBox',
  component: CheckBox,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
};

const Template = args => <CheckBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  description: '설명란',
  checked: true,
  size: 'medium',
};

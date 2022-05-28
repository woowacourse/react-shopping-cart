import TextUnderline from '.';

export default {
  title: 'Component/@common/TextUnderline',
  component: TextUnderline,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <TextUnderline {...args} />;

export const DefaultText = Template.bind({});
DefaultText.args = { children: '글씨 밑줄 꾸미기' };

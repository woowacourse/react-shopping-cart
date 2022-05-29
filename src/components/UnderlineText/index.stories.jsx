import UnderlineText from '.';

export default {
  title: 'Components/UnderlineText',
  component: UnderlineText,
};

const Template = args => <UnderlineText {...args} />;

export const UnderlineTextTemplate = Template.bind({});
UnderlineTextTemplate.args = {
  text: '글자를 입력해보세요.',
};

import WhiteText from '../components/WhiteText';

export default {
  title: 'Component/WhiteText',
  component: WhiteText,
  argTypes: {
    fontSize: { controls: 'number' },
    fontWeight: { controls: 'number' },
    children: { controls: 'text' },
  },
};

const DefaultWhiteTextTemplate = (args) => <WhiteText {...args} />;

export const DefaultWhiteText = DefaultWhiteTextTemplate.bind({});
DefaultWhiteText.args = {
  fontSize: 15,
  fontWeight: 500,
  children: '안녕',
};

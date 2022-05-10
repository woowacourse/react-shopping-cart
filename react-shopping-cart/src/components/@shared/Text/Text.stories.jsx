import Text from './Text.component';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    fontSize: { control: 'select', options: ['small', 'medium', 'large', 'extraLarge'] },
  },
};

export const SmallFontSizeText = args => <Text {...args}>작은 글씨체</Text>;
SmallFontSizeText.args = {
  fontSize: 'small',
};

export const MediumFontSizeText = args => <Text {...args}>중간 글씨체</Text>;
MediumFontSizeText.args = {
  fontSize: 'medium',
};

export const LargeFontSizeText = args => <Text {...args}>큰 글씨체</Text>;
LargeFontSizeText.args = {
  fontSize: 'large',
};

export const ExtraLargeFontSizeText = args => <Text {...args}>엄청 큰 글씨체</Text>;
ExtraLargeFontSizeText.args = {
  fontSize: 'extraLarge',
};

export const BoldText = args => <Text {...args}>두꺼운 글씨체</Text>;
BoldText.args = {
  bold: true,
};

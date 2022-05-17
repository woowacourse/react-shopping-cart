import TextBox from './TextBox.component';

export default {
  title: 'Shared/TextBox',
  component: TextBox,
  argTypes: {
    fontSize: { control: 'select', options: ['small', 'medium', 'large', 'extraLarge'] },
  },
};

export const SmallFontSizeText = args => <TextBox {...args}>작은 글씨체</TextBox>;
SmallFontSizeText.args = {
  fontSize: 'small',
};

export const MediumFontSizeText = args => <TextBox {...args}>중간 글씨체</TextBox>;
MediumFontSizeText.args = {
  fontSize: 'medium',
};

export const LargeFontSizeText = args => <TextBox {...args}>큰 글씨체</TextBox>;
LargeFontSizeText.args = {
  fontSize: 'large',
};

export const ExtraLargeFontSizeText = args => <TextBox {...args}>엄청 큰 글씨체</TextBox>;
ExtraLargeFontSizeText.args = {
  fontSize: 'extraLarge',
};

export const BoldText = args => <TextBox {...args}>두꺼운 글씨체</TextBox>;
BoldText.args = {
  bold: true,
};

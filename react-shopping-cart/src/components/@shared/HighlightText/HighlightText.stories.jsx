import HighlightText from './HighlightText.component';

export default {
  title: 'Shared/HighlightText',
  component: HighlightText,
};

export const DefaultHighlightText = args => <HighlightText {...args}>밑줄 친 글씨</HighlightText>;
DefaultHighlightText.args = {};

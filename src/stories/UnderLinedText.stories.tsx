import { ComponentMeta, ComponentStory } from '@storybook/react';
import UnderLinedText from 'components/common/UnderLinedText';

export default {
  component: UnderLinedText,
  title: 'UnderLinedText',
} as ComponentMeta<typeof UnderLinedText>;

const Template = args => <UnderLinedText {...args} />;

export const Default: ComponentStory<typeof UnderLinedText> = Template.bind({});
Default.args = {
  children: '결제예상금액',
  fontSize: '24px',
};

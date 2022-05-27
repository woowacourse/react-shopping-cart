import { ComponentMeta, ComponentStory } from '@storybook/react';
import LayoutWithTitle from 'components/common/LayoutWithTitle';

export default {
  component: LayoutWithTitle,
  title: 'LayoutWithTitle',
  args: {
    title: '장바구니',
  },
} as ComponentMeta<typeof LayoutWithTitle>;

const Template = args => <LayoutWithTitle {...args} />;

export const Default: ComponentStory<typeof LayoutWithTitle> = Template.bind({});

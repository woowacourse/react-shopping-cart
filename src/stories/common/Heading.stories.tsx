import { Meta, StoryObj } from '@storybook/react';

import Heading, { HeadingProps } from '../../components/common/Heading/Heading';
import { StoryContainer, StoryInfoContainer } from '../styles';

const meta = {
  title: 'ShoppingCart/Common/Heading',
  component: Heading,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge'],
    },
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    size: 'medium',
    children: 'Heading',
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

const createHeadingStory = (size: HeadingProps['size']) => ({
  args: {
    size,
  },
  argTypes: {
    size: {
      control: false,
    },
  },
});

export const Playground: Story = {};

export const Sizes: Story = {
  render: ({ children }) => {
    return (
      <>
        <StoryInfoContainer>
          <h6>X Small</h6>
          <Heading size="xSmall">{children}</Heading>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Small</h6>
          <Heading size="small">{children}</Heading>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Medium</h6>
          <Heading size="medium">{children}</Heading>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Large</h6>
          <Heading size="large">{children}</Heading>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>X Large</h6>
          <Heading size="xLarge">{children}</Heading>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>XX Large</h6>
          <Heading size="xxLarge">{children}</Heading>
        </StoryInfoContainer>
      </>
    );
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

export const XSmall: Story = createHeadingStory('xSmall');

export const Small: Story = createHeadingStory('small');

export const Medium: Story = createHeadingStory('medium');

export const Large: Story = createHeadingStory('large');

export const XLarge: Story = createHeadingStory('xLarge');

export const XXLarge: Story = createHeadingStory('xxLarge');

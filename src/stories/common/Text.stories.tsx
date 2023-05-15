import { Meta, StoryObj } from '@storybook/react';

import { Text, TextProps } from '../../components/common/Text/Text.styles';
import { StoryContainer, StoryInfoContainer } from '../styles';

const meta = {
  title: 'ShoppingCart/Common/Text',
  component: Text,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['xSmall', 'small', 'medium', 'large'],
    },
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    size: 'medium',
    children: 'Text',
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const createTextStory = (size: TextProps['size']) => ({
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
          <Text size="xSmall">{children}</Text>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Small</h6>
          <Text size="small">{children}</Text>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Medium</h6>
          <Text size="medium">{children}</Text>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Large</h6>
          <Text size="large">{children}</Text>
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

export const XSmall: Story = createTextStory('xSmall');

export const Small: Story = createTextStory('small');

export const Medium: Story = createTextStory('medium');

export const Large: Story = createTextStory('large');

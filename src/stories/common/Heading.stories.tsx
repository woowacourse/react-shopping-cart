import { Meta, StoryObj } from '@storybook/react';

import Heading from '../../components/common/Heading/Heading';
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

export const XSmall: Story = {
  args: {
    size: 'xSmall',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

export const XLarge: Story = {
  args: {
    size: 'xLarge',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

export const XXLarge: Story = {
  args: {
    size: 'xxLarge',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
};

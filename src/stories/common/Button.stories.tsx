import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../components/common/Button/Button';
import { StoryContainer, StoryInfoContainer } from '../styles';

const meta = {
  title: 'ShoppingCart/Common/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'primary', 'secondary', 'textButton', 'danger'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    children: {
      control: { type: 'text' },
    },
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'medium',
  },
};

export const Variants: Story = {
  args: {
    size: 'medium',
  },
  render: ({ size, children, ...args }) => {
    return (
      <>
        <StoryInfoContainer>
          <h6>Default</h6>
          <Button variant="default" size={size} {...args}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Primary</h6>
          <Button variant="primary" size={size} {...args}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Secondary</h6>
          <Button variant="secondary" size={size} {...args}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Text Button</h6>
          <Button variant="textButton" size={size} {...args}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Danger</h6>
          <Button variant="danger" size={size} {...args}>
            {children}
          </Button>
        </StoryInfoContainer>
      </>
    );
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
};

export const Sizes: Story = {
  args: {
    variant: 'default',
  },
  render: ({ variant, children, ...args }) => {
    return (
      <>
        <StoryInfoContainer>
          <h6>Small</h6>
          <Button variant={variant} size="small" {...args}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Medium</h6>
          <Button variant={variant} size="medium" {...args}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Large</h6>
          <Button variant={variant} size="large" {...args}>
            {children}
          </Button>
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

export const Default: Story = {
  args: {
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
};

export const TextButton: Story = {
  args: {
    variant: 'textButton',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
};

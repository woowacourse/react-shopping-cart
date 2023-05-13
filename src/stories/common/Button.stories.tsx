import type { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonProps } from '../../components/common/Button/Button';
import { StoryContainer, StoryInfoContainer } from '../styles';

const meta = {
  title: 'ShoppingCart/Common/Button',
  component: Button,
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
  args: {
    variant: 'default',
    size: 'medium',
    children: 'Button',
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
type Story = StoryObj<typeof meta>;

const createButtonStory = (variant: ButtonProps['variant']) => ({
  args: {
    variant,
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
});

export const Playground: Story = {};

export const Variants: Story = {
  render: ({ size, children }) => {
    return (
      <>
        <StoryInfoContainer>
          <h6>Default</h6>
          <Button variant="default" size={size}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Primary</h6>
          <Button variant="primary" size={size}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Secondary</h6>
          <Button variant="secondary" size={size}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Text Button</h6>
          <Button variant="textButton" size={size}>
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Danger</h6>
          <Button variant="danger" size={size}>
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
  render: ({ variant, children, ...args }) => {
    return (
      <>
        <StoryInfoContainer>
          <h6>Small</h6>
          <Button variant={variant} size="small">
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Medium</h6>
          <Button variant={variant} size="medium">
            {children}
          </Button>
        </StoryInfoContainer>
        <StoryInfoContainer>
          <h6>Large</h6>
          <Button variant={variant} size="large">
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

export const Default: Story = createButtonStory('default');

export const Primary: Story = createButtonStory('primary');

export const Secondary: Story = createButtonStory('secondary');

export const TextButton: Story = createButtonStory('textButton');

export const Danger: Story = createButtonStory('danger');

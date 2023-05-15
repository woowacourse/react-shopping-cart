import { Meta, StoryObj } from '@storybook/react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { css, styled } from 'styled-components';
import InputComponent from '../../../components/common/Input';

const QuantityInputStyle = css`
  position: relative;
  z-index: 1;
  width: 80px;
  height: 32px;
  font-size: 13px;
  text-align: center;
  color: var(--text-color);
  border: 1px solid var(--gray-color-200);
  background: none;
`;

const meta = {
  component: InputComponent,
  title: 'Components/Input',
  tags: ['autodocs'],

  argTypes: {
    css: {
      control: {
        type: 'radio',
      },
      description: 'input을 꾸밀 수 있습니다.',
    },

    onChange: {
      options: {
        Whatever: () => {},
      },
    },
  },
} satisfies Meta<typeof InputComponent>;

export default meta;

type Story = StoryObj<typeof InputComponent>;

export const Input: Story = {
  args: {
    type: 'number',
    placeholder: 'Input',
  },

  argTypes: {
    type: {
      description: 'Input의 타입을 설정할 수 있습니다.',
    },

    placeholder: {
      options: {
        default: 'Input',
        none: '',
      },
      control: {
        type: 'radio',
      },
      description: 'default: Input<br> none: placeholder 제거',
    },
  },

  decorators: [
    (Story) => {
      return (
        <div style={{ border: '1px solid #000', padding: '6px' }}>
          <Story />
        </div>
      );
    },
  ],
};

export const QuantityInput: Story = {
  args: {
    type: 'number',
    inputMode: 'numeric',
    autoComplete: 'on',
    name: 'quantity',
    'aria-label': 'quantity-input',
    min: 1,
    max: 99,
    css: QuantityInputStyle,
    defaultValue: 1,
  },

  decorators: [
    (Story) => {
      return (
        <S.InputWrapper>
          <Story />
          <FaCaretUp />
          <FaCaretDown />
        </S.InputWrapper>
      );
    },
  ],
};

const S = {
  InputWrapper: styled.div`
    position: relative;

    & svg {
      position: absolute;
      z-index: 0;
      width: 26px;
      max-width: 26px;
      right: 0;
      border: 1px solid var(--gray-color-200);
    }

    & svg:nth-child(2) {
      top: 0;
    }

    & svg:nth-child(3) {
      top: 16px;
    }
  `,
};

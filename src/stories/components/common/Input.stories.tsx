import { Meta, StoryObj } from '@storybook/react';
import InputComponent from '../../../components/@common/Input';
import { RecoilRoot } from 'recoil';

const meta = {
  component: InputComponent,
  title: 'Components/Common/Input',
  tags: ['autodocs'],

  argTypes: {
    styled: {
      options: {},
      control: {
        type: 'radio',
      },
      description: 'input style을 선택할 수 있습니다.',
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
        <RecoilRoot>
          <div style={{ border: '1px solid #000', padding: '6px' }}>
            <Story />
          </div>
        </RecoilRoot>
      );
    },
  ],
};

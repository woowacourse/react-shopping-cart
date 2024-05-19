import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckBox from '../components/common/CheckBox';

const meta: Meta<typeof CheckBox> = {
  title: 'Common/CheckBox',
  component: CheckBox,
  parameters: {
    docs: {
      description: {
        component: '체크박스 컴포넌트입니다.',
      },
    },
  },

  tags: ['autodocs'],

  argTypes: {
    isSelected: {
      description: '체크박스의 체크 여부를 조작할 수 있습니다.',
    },
    toggleSelected: {
      table: {
        disable: true,
      },
    },
    label: {
      description: '체크박스에 레이블을 추가할 수 있습니다.',
    },
  },

  decorators: [
    (Story, { args }) => {
      const [isSelected, setSelected] = useState(args.isSelected);
      const toggleSelected = () => {
        action(`체크박스 클릭`);
        setSelected((prev) => !prev);
      };

      return (
        <Story
          {...args}
          isSelected={isSelected}
          toggleSelected={toggleSelected}
        />
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const SelectedCheckBox: Story = {
  args: {
    isSelected: true,
    label: '',
  },
};

export const UnselectedCheckBox: Story = {
  args: {
    isSelected: false,
    label: '',
  },
};

export const LabelCheckBox: Story = {
  args: {
    isSelected: true,
    label: '전체 선택',
  },
};

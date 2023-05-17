import { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';
import { PropsWithChildren, useState } from 'react';

const meta = {
  component: CheckBox,
  title: 'CheckBox',
  argTypes: {
    checked: {
      description: '체크박스의 체크 상태입니다.',
    },

    onChange: {
      description: '체크박스, label text 클릭 시 실행될 함수입니다.',
    },

    children: {
      description: 'label text입니다.',
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof CheckBox>;

const CheckBoxWithHooks = ({ children }: PropsWithChildren) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => setIsChecked(e.target.checked);

  return (
    <CheckBox checked={isChecked} onChange={handleCheckboxChange}>
      {children}
    </CheckBox>
  );
};

export const OnlyCheckbox: Story = {
  render: () => <CheckBoxWithHooks />,
};

export const WithLabel: Story = {
  render: () => <CheckBoxWithHooks>전체 선택</CheckBoxWithHooks>,
};

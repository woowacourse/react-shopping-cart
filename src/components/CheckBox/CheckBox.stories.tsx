import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

const meta = {
  title: 'CheckBox',
  component: CheckBox,
  decorators: [
    (Story) => {
      const [isChecked, setIsChecked] = React.useState(false);
      const onClick = () => {
        setIsChecked(!isChecked);
      };

      return <div>{<Story args={{ isCheck: isChecked, onClick }} />}</div>;
    },
  ],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCheck: false,
    onClick: () => {},
  },
};

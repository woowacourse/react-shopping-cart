import type { Meta, StoryObj } from '@storybook/react';

import SelectCouponModal from './SelectCouponModal';
import { useState } from 'react';
import Button from '../common/Button/Button';

const meta = {
  title: 'Components/SelectCouponModal',
  component: SelectCouponModal,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectCouponModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpened(true)}>show modal</Button>
        <SelectCouponModal
          modalOpened={isOpened}
          onClose={() => setIsOpened(false)}
        />
      </>
    );
  },
};

import { Meta, StoryObj } from '@storybook/react';
import { useSetRecoilState } from 'recoil';

import ErrorModal from '../../components/common/ErrorModal/ErrorModal';
import { errorModalMessageState } from '../../store/error';

const meta = {
  title: 'ShoppingCart/Common/ErrorModal',
  component: ErrorModal,
} satisfies Meta<typeof ErrorModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const setErrorMessage = useSetRecoilState(errorModalMessageState);
    setErrorMessage('일시적인 오류가 발생했습니다.');

    return <ErrorModal />;
  },
};

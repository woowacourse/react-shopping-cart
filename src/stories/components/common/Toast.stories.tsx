import { Meta, StoryObj } from '@storybook/react';

import Toast from '../../../components/@common/Toast';

const meta = {
  title: 'Components/Common/Toast',
  component: Toast,
  tags: ['autodocs'],
  args:{
    isShowToast: true,
    message: 'Show toasts',
    dismissToast: () => {},
  }, 
  argTypes:{
    isShowToast: {
        active:{
            control:'boolean',
        },
        description: '토스트를 사라진 후에도 켜고 끌 수 있습니다.'
    },
    message:{
        description: '토스트에 나타날 메시지를 설정할 수 있습니다.'
    },
    dismissToast : {
        options:{
            Whatever: () => {}
        }
    }

  }
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

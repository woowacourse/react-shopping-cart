import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductSelectListPart from '.';

/**
 * `ProductSelectListPart`은 장바구니 상세 페이지 중 품목을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof ProductSelectListPart> = {
  title: 'ProductSelectListPart',
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <div style={{ width: '900px' }}>{storyFn()}</div>
      </RecoilRoot>
    ),
  ],
  component: ProductSelectListPart,
};

export default meta;

type Story = StoryObj<typeof ProductSelectListPart>;

export const DefaultProductSelectListPart: Story = {
  args: {
    checkController: {
      checkedItemsId: [],
      updateEachItemCheckStatus: () => {
        return () => {
          return;
        };
      },
      updateAllItemCheckState: () => {
        return;
      },
      parentCheckbox: () => {
        return;
      },
    },
  },
};

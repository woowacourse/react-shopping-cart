import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import EstimatedAmountPart from '.';

/**
 * `EstimatedAmountPart`은 장바구니 상세 페이지 중 결제 예상 금액을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof EstimatedAmountPart> = {
  title: 'EstimatedAmountPart',
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <div style={{ width: '500px' }}>{storyFn()}</div>
      </RecoilRoot>
    ),
  ],
  component: EstimatedAmountPart,
};

export default meta;

type Story = StoryObj<typeof EstimatedAmountPart>;

export const DefaultEstimatedAmountPart: Story = {};

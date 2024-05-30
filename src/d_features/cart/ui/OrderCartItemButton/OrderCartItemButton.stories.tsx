import { RecoilRoot } from 'recoil';

import { OrderCartItemButton } from './OrderCartItemButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OrderCartItemButton> = {
  title: '4. features/cart/OrderCartItemButton',
  component: OrderCartItemButton,
};

export default meta;

type Story = StoryObj<typeof OrderCartItemButton>;

export const Enabled: Story = {
  decorators: [
    (Story) => {
      // const setDisabled = useSetRecoilState(OrderConfirmButtonDisabledState);
      // setDisabled(false);
      return (
        <RecoilRoot>
          <div style={{ width: '90vw' }}>
            <Story />
          </div>
        </RecoilRoot>
      );
    },
  ],
};

// TODO: Connect to disable state
// export const Disabled: Story = {
//   decorators: [
//     (Story) => {
//       const setDisabled = useSetRecoilState(OrderConfirmButtonDisabledState);
//       setDisabled(true);

//       return (
//         <RecoilRoot>
//           <div style={{ width: '90vw' }}>
//             <Story />
//           </div>
//         </RecoilRoot>
//       );
//     },
//   ],
// };

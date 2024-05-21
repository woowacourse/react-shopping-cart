import { OrderConfirmButton } from './OrderConfirmButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OrderConfirmButton> = {
  title: 'features/cart/OrderConfirmButton',
  component: OrderConfirmButton,
};

export default meta;

type Story = StoryObj<typeof OrderConfirmButton>;

// TODO: Connect to disable state
export const Enabled: Story = {
  decorators: [
    (Story) => {
      // const setDisabled = useSetRecoilState(OrderConfirmButtonDisabledState);
      // setDisabled(false);
      return (
        // <RecoilRoot>
        <div style={{ width: '90vw' }}>
          <Story />
        </div>
        // </RecoilRoot>
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

import { OrderCartButton } from './OrderCartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OrderCartButton> = {
  title: '4. features/cart/OrderCartButton',
  component: OrderCartButton,
};

export default meta;

type Story = StoryObj<typeof OrderCartButton>;

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

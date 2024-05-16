import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CheckBox from "../components/common/CheckBox";

const meta: Meta<typeof CheckBox> = {
  title: "Common/CheckBox",
  component: CheckBox,
  parameters: {
    docs: {
      description: {
        component: "체크박스 컴포넌트입니다.",
      },
    },
  },

  tags: ["autodocs"],

  argTypes: {
    isSelected: {
      description: "체크박스의 체크 여부를 조작할 수 있습니다.",
    },
    toggleSelected: {
      table: {
        disable: true,
      },
    },
    label: {
      description: "체크박스에 레이블을 추가할 수 있습니다.",
    },
  },

  decorators: [
    (Story, { args }) => {
      const [isSelected, setSelected] = useState(args.isSelected);
      const toggleSelected = () => {
        action(`체크박스 클릭`);
        setSelected((prev) => !prev);
      };

      return (
        <Story
          {...args}
          isSelected={isSelected}
          toggleSelected={toggleSelected}
        />
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const SelectedCheckBox: Story = {
  args: {
    isSelected: true,
    label: "",
  },
};

export const UnselectedCheckBox: Story = {
  args: {
    isSelected: false,
    label: "",
  },
};

export const LabelCheckBox: Story = {
  args: {
    isSelected: true,
    label: "전체 선택",
  },
};

// // src/stories/CartItem.stories.tsx
// import { ThemeProvider } from "@emotion/react";
// import { ComponentMeta, ComponentStory } from "@storybook/react";
// import { RecoilRoot } from "recoil";
// import CartItem from "../components/CartItem/CartItem";
// import { theme } from "../theme";
// import { CartItemType } from "../types";

// export default {
//   title: "Cart/CartItem",
//   component: CartItem,
//   decorators: [
//     (Story) => (
//       <RecoilRoot>
//         <ThemeProvider theme={theme}>
//           <Story />
//         </ThemeProvider>
//       </RecoilRoot>
//     ),
//   ],
// } as ComponentMeta<typeof CartItem>;

// const Template: ComponentStory<typeof CartItem> = (args) => (
//   <CartItem {...args} />
// );

// const mockCartItem: CartItemType = {
//   id: "1",
//   product: {
//     id: "1",
//     name: "Sample Product",
//     price: 10000,
//     imageUrl: "https://via.placeholder.com/150",
//   },
// };

// export const Default = Template.bind({});
// Default.args = {
//   cartItem: mockCartItem,
// };

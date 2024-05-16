import type { Meta, StoryObj } from "@storybook/react";
import Header from "../components/Header";
import { StoryContainer } from "./styles";

const meta = {
  title: "ShoppingCart/Header",
  component: Header,
  args: {
    isShowLogo: true,
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

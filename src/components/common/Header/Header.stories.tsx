import Header from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Header",
  component: Header,
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "100vh", height: "100vh" }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "centered",
    docs: { description: { component: "Header Component." } },
  },

  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "Default Header" } },
  },
};

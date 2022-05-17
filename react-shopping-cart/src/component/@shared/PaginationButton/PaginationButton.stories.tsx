import PaginationButton from "component/@shared/PaginationButton/PaginationButton";
import { Meta, Story } from "@storybook/react";

export default {
  title: "PaginationButton",
  component: PaginationButton,
} as Meta;

export const DefaultPaginationButton: Story = () => (
  <PaginationButton to="/">1</PaginationButton>
);

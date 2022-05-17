import Spinner from "component/@shared/Spinner/Spinner";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Spinner",
  component: Spinner,
} as Meta;

const Template: Story = () => <Spinner />;

export const DefaultSpinner = Template.bind({});

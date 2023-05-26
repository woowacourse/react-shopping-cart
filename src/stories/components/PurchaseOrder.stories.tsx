import { StoryFn, Meta } from "@storybook/react";
import PurchaseOrder from "components/PurchaseOrder";

export default {
  title: "PurchaseOrder",
  component: PurchaseOrder,
} as Meta;

const Template: StoryFn = () => <PurchaseOrder />;

export const Default = Template.bind({});

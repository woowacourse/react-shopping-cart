import { StoryFn, Meta } from "@storybook/react";
import QuantityCounter from "components/QuantityCounter";

export default {
  title: "Counter",
  component: QuantityCounter,
} as Meta;

const Template: StoryFn = () => <QuantityCounter itemId={1} />;

export const CounterSample = Template.bind({});

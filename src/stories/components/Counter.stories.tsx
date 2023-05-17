import { StoryFn, Meta } from "@storybook/react";
import { Counter } from "../../components";

export default {
  title: "Counter",
  component: Counter,
} as Meta;

const Template: StoryFn = () => <Counter itemId={1} />;

export const CounterSample = Template.bind({});

import { StoryFn, Meta } from "@storybook/react";
import Header from "components/Header";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: StoryFn = () => <Header />;

export const MainHeader = Template.bind({});

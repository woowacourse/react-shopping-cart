import { StoryFn, Meta } from "@storybook/react";
import Main from "pages/Main";

export default {
  title: "MainPage",
  component: Main,
} as Meta;

const Template: StoryFn = () => <Main />;

export const MainPage = Template.bind({});

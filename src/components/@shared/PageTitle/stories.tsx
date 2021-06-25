import React from "react";
import { Story, Meta } from "@storybook/react";

import PageTitle, { PageTitleProps } from ".";

export default {
  title: "PageTitle",
  component: PageTitle,
} as Meta;

const Template: Story<PageTitleProps> = (args) => <PageTitle {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: "타이틀",
};

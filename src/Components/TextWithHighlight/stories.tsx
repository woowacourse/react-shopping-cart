import React from "react";
import { Story, Meta } from "@storybook/react";

import TextWithHighlight, { TextWithHighlightProps } from ".";
import { COLOR } from "../../constants/theme";

export default {
  title: "TextWithHighlight",
  component: TextWithHighlight,
} as Meta;

const Template: Story<TextWithHighlightProps> = (args) => <TextWithHighlight {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: "텍스트 입니다.",
  fontSize: "1.5rem",
  color: COLOR.BLACK,
  fontWeight: "700",
  highlightColor: COLOR.MAIN,
};

import React from "react";
import IconButton from "components/common/Button/IconButton";

export default {
  title: "Component/Common/IconButton",
  component: IconButton,
  argTypes: {
    src: { controls: "text" },
    alt: { controls: "text" },
    width: { controls: "text" },
  },
};

const Template = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
  alt: "인스타그램 아이콘 버튼",
  width: "30px",
};

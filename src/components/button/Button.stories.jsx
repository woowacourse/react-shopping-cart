import Button from "./Button";

export default {
  title: "Button/button",
  component: Button,
  argTypes: {
    variant: {
      options: ["default", "primary"],
      control: { type: "radio" },
    },
    block: {
      control: { type: "boolean" },
    },
  },
};

function Template(args) {
  return <Button {...args}>Button</Button>;
}

export const Primary = Template.bind({});

Primary.args = {
  variant: "",
};

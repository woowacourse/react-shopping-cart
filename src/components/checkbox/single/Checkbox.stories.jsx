import Checkbox from "./Checkbox";

export default {
  title: "Checkbox/Checkbox",
  component: Checkbox,
  argTypes: {},
};

function Template(args) {
  return <Checkbox {...args} />;
}

export const Primary = Template.bind({});

Primary.args = {
  id: "input-id",
};

Primary.argTypes = {
  id: { control: { disable: true } },
};

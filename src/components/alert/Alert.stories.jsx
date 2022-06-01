import Alert from "./Alert";

export default {
  title: "Alert/danger",
  component: Alert,
  argTypes: {},
};

function Template(args) {
  return <Alert {...args} />;
}

export const Primary = Template.bind({});
Primary.args = {
  children: "This is sample message",
};

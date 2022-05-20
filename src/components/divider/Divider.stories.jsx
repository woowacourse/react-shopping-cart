import Divider from "./Divider";

export default {
  title: "Divider/Divider",
  component: Divider,
  argTypes: {},
};

function Template(args) {
  return <Divider {...args} />;
}

export const Primary = Template.bind({});

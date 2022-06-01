import Highlighter from "./Highlighter";

export default {
  title: "Highlighter/default",
  component: Highlighter,
  argTypes: {},
};

function Template(args) {
  return <Highlighter {...args}>Hello</Highlighter>;
}

export const Primary = Template.bind({});

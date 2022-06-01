import NumberInput from "./NumberInput";

export default {
  title: "NumberInput/numberInput",
  component: NumberInput,
  argTypes: {
    step: {
      control: { type: "number" },
    },
    positive: {
      control: { type: "boolean" },
    },
  },
};

function Template(args) {
  return <NumberInput {...args} />;
}

export const Primary = Template.bind({});

Primary.args = {
  value: 1,
  onChange: () => undefined,
};

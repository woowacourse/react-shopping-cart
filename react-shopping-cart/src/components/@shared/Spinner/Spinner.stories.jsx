import Spinner from "components/@shared/Spinner/Spinner";

export default {
  title: "Spinner",
  component: Spinner,
};

const Template = (args) => <Spinner {...args} />;

export const DefaultSpinner = Template.bind({});
DefaultSpinner.args = {};

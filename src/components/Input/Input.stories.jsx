import Input from './Input';

export default {
  title: 'Component/Input',
  component: Input,
};

function Template(args) {
  return <Input {...args} />;
}

export const Default = Template.bind({});

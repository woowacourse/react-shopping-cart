import { Button } from 'component/@common';

export default {
  title: 'Component/@Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <Button {...args} />;

const DefaultButton = Template.bind({});

DefaultButton.args = {
  children: '버튼',
};

export { DefaultButton };

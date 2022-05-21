import { Button } from 'components/@common';

export default {
  title: 'Components/@Common/Button',
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

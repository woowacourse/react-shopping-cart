import Button from '.';

export default {
  component: Button,
  title: 'components/shared/Button',
};

const StoryTemplate = (args) => <Button {...args}>버튼</Button>;

export const Default = StoryTemplate.bind({});

Default.args = {};

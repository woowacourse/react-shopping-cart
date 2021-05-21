import Checkbox from '.';

export default {
  component: Checkbox,
  title: 'components/shared/Checkbox',
};

const StoryTemplate = (args) => <Checkbox {...args} />;

export const Default = StoryTemplate.bind({});

Default.args = {};

export const WithText = StoryTemplate.bind({});

WithText.args = {
  children: 'hi',
};

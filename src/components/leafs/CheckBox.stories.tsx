import type { StoryFn } from '@storybook/react';

import CheckBox from './CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
};

const Template: StoryFn<React.ComponentProps<typeof CheckBox>> = (props) => {
  return <CheckBox {...props} />;
};

export const Controls = Template.bind({});
Controls.args = {
  checked: true,
};

import type { StoryFn } from '@storybook/react';

import QuantityInput from './QuantityInput';

export default {
  title: 'QuantityInput',
  component: QuantityInput,
};

const Template: StoryFn<React.ComponentProps<typeof QuantityInput>> = (props) => {
  return <QuantityInput {...props} />;
};

export const Controls = Template.bind({});
Controls.args = {
  cartItemId: 1,
  min: 0,
  max: 10,
  style: {},
};

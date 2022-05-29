import { useState } from 'react';
import Counter from '.';

export default {
  title: 'Components/Counter',
  component: Counter,
  argTypes: {
    quantity: {
      control: false,
    },
  },
};

const Template = args => {
  const [quantity, setQuantity] = useState(0);

  return (
    <Counter
      {...args}
      quantity={quantity}
      increase={() => setQuantity(prev => prev + 1)}
      decrease={() => setQuantity(prev => prev - 1)}
    />
  );
};

export const CounterTemplate = Template.bind({});
CounterTemplate.args = {};

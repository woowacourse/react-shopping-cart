import { useState } from 'react';
import QuantityController from '.';

export default {
  title: 'Components/QuantityController',
  component: QuantityController,
  argTypes: {
    quantity: { control: false },
    handleClick: { action: 'QuantityController is clicked' },
  },
};

const Template = args => {
  const [quantity, setQuantity] = useState(0);

  return (
    <QuantityController
      {...args}
      quantity={quantity}
      increase={() => setQuantity(prev => prev + 1)}
      decrease={() => setQuantity(prev => prev - 1)}
    />
  );
};

export const QuantityControllerTemplate = Template.bind({});
QuantityControllerTemplate.args = {};

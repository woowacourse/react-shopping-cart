import Counter from './Counter.component';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Shared/Counter',
  component: Counter,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = args => {
  const [{ children }, updateArgs] = useArgs();

  const handleClickIncrease = () => updateArgs({ children: children + 1 });

  const handleClickDecrease = () =>
    updateArgs({ children: children === 0 ? children : children - 1 });

  return (
    <Counter
      {...args}
      handleClickIncrease={handleClickIncrease}
      handleClickDecrease={handleClickDecrease}
    />
  );
};

Default.args = {
  children: 1,
};

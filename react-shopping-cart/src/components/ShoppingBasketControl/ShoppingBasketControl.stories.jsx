import { useArgs } from '@storybook/client-api';
import ShoppingBasketControl from './ShoppingBasketControl.component';

export default {
  title: 'Components/ShoppingBasketControl',
  component: ShoppingBasketControl,
};

export const Default = args => {
  const [{ isAllSelected }, updateArgs] = useArgs();

  const clickAllCheckbox = () => {
    updateArgs({ isAllSelected: !isAllSelected });
  };
  return <ShoppingBasketControl clickAllCheckbox={clickAllCheckbox} {...args} />;
};

Default.args = {
  isAllSelected: false,
};

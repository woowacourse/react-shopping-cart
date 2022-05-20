import ShoppingBasketListItem from './ShoppingBasketListItem.component';
import { useArgs } from '@storybook/client-api';

export default {
  title: 'Components/ShoppingBasketListItem',
  component: ShoppingBasketListItem,
  decorators: [
    Story => (
      <div style={{ width: '731px' }}>
        <Story />
      </div>
    ),
  ],
};

const PRODUCT_DATA = {
  id: 1,
  thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12619-main-01.jpg',
  name: '[든든] 전지베이컨 500g',
  price: 6390,
};

export const Default = args => {
  const [{ count }, updateArgs] = useArgs();

  const handleClickIncrease = () => updateArgs({ count: count + 1 });

  const handleClickDecrease = () => updateArgs({ count: count === 0 ? count : count - 1 });

  return (
    <ShoppingBasketListItem
      {...args}
      handleClickIncrease={handleClickIncrease}
      handleClickDecrease={handleClickDecrease}
    />
  );
};

Default.args = {
  ...PRODUCT_DATA,
  count: 1,
};

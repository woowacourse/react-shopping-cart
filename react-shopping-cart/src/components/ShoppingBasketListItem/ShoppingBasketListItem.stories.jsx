import ShoppingBasketListItem from './ShoppingBasketListItem.component';
import { action } from '@storybook/addon-actions';
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
  const [{ quantity }, updateArgs] = useArgs();

  const clickCheckbox = action('clickCheckbox');

  const deleteProducts = action('deleteProduct');

  const increaseQuantity = () => updateArgs({ quantity: quantity + 1 });

  const decreaseQuantity = () => updateArgs({ quantity: quantity === 0 ? quantity : quantity - 1 });

  return (
    <ShoppingBasketListItem
      {...args}
      clickCheckbox={clickCheckbox}
      deleteProducts={deleteProducts}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  );
};

Default.args = {
  ...PRODUCT_DATA,
  quantity: 1,
};

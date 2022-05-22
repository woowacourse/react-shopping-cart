import ProductListItem from './ProductListItem.component';

import { useArgs } from '@storybook/client-api';

import DefaultImage from 'assets/images/baeminImage.png';

export default {
  title: 'Components/ProductListItem',
  component: ProductListItem,
};

const Template = args => {
  const [{ isContained }, updateArgs] = useArgs();

  const handleToggleShoppingCart = () => updateArgs({ isContained: !isContained });

  return <ProductListItem handleToggleShoppingCart={handleToggleShoppingCart} {...args} />;
};

export const DefaultProductListItem = Template.bind({});
DefaultProductListItem.args = {
  thumbnail: DefaultImage,
  name: 'PET보틀-정사각(420ml)',
  price: '43,400',
};

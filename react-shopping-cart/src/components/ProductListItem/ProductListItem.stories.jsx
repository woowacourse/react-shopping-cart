import ProductListItem from './ProductListItem.component';
import DefaultImage from 'assets/images/baeminImage.png';

export default {
  title: 'Components/ProductListItem',
  component: ProductListItem,
};

export const Default = args => <ProductListItem {...args} />;

Default.args = {
  thumbnail: DefaultImage,
  name: 'PET보틀-정사각(420ml)',
  price: '43,400',
};

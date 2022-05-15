import { Provider } from 'react-redux';

import ProductItem from '../components/ProductItem';
import store from 'store';

export default {
  title: 'Component/ProductItem',
  component: ProductItem,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <Provider store={store}>
    <ProductItem {...args} />
  </Provider>
);

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  image: '기본 이미지 URL',
  name: '감자',
  price: 50000,
};

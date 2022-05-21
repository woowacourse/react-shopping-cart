import { BrowserRouter } from 'react-router-dom';
import { ProductList } from 'page';

export default {
  title: 'Component/ProductList',
  component: ProductList,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template = args => <ProductList {...args} />;

const DefaultProductList = Template.bind({});

DefaultProductList.args = {};

export { DefaultProductList };

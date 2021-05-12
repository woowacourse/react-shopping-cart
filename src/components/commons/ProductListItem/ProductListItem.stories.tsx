import ProductListItem, { Props } from './ProductListItem';

export default {
  title: 'Components/Commons/ProductListItem',
  component: ProductListItem,
  argTypes: {},
};

const Template = (args: Props) => <ProductListItem {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  thumbnail:
    'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  name: '상품 이름',
  price: '10,000',
  quantity: '3',
  size: 'SM',
};

import ProductGridItem, { Props } from './ProductGridItem';

export default {
  title: 'Components/ProductListPage/ProductGridItem',
  component: ProductGridItem,
  argTypes: {},
};

const Template = (args: Props) => <ProductGridItem {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  productName: '상품 이름',
  productPrice: '18,900',
  productThumbnail:
    'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
};

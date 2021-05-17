import OrderItemGroup, { Props } from './OrderItemGroup';
import ProductListItem from '../ProductListItem/ProductListItem';

export default {
  title: 'Components/Commons/OrderItemGroup',
  component: OrderItemGroup,
  argTypes: {},
};

const Template = (args: Props) => (
  <OrderItemGroup {...args}>
    <ProductListItem
      productThumbnail={
        'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      }
      productName={'상품 이름'}
      productPrice={'10,000'}
      productQuantity={'3'}
      size={'SM'}
    />
  </OrderItemGroup>
);

export const Default = Template.bind({});

(Default as any).args = {
  orderNumber: '2',
};

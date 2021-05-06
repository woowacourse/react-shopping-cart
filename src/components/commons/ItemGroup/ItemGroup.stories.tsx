import ItemGroup, { Props } from './ItemGroup';
import ProductListItem from '../ProductListItem/ProductListItem';

export default {
  title: 'Components/Commons/ItemGroup',
  component: ItemGroup,
  argTypes: {},
};

const Template = (args: Props) => (
  <ItemGroup {...args}>
    <ProductListItem
      productThumbnail={
        'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      }
      productName={'상품 이름'}
      productPrice={'10,000'}
      productQuantity={'3'}
      size={'SM'}
    />
  </ItemGroup>
);

export const Default = Template.bind({});

Default.args = {
  orderNumber: '2',
};

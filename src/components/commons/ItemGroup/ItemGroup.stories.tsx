import styled from 'styled-components';
import ItemGroup, { Props } from './ItemGroup';
import ProductListItem from '../ProductListItem/ProductListItem';

export default {
  title: 'Components/Commons/ItemGroup',
  component: ItemGroup,
  argTypes: {},
};

const ItemWrapper = styled.div`
  padding: 20px;
`;

const Template = (args: Props) => (
  <ItemGroup {...args}>
    <ItemWrapper>
      <ProductListItem
        thumbnail={
          'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
        name={'상품 이름'}
        price={'10,000'}
        quantity={'3'}
        size={'SM'}
      />
    </ItemWrapper>
  </ItemGroup>
);

export const Default = Template.bind({});

(Default as any).args = {
  orderNumber: '2',
};

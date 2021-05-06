import React from 'react';
import ProductList from '.';
import PALETTE from '../../../constants/palette';
import AmountInput from '../../common/AmountInput';
import Button from '../../common/Button';
import FlexContainer from '../../common/FlexContainer';
import TrashBin from '../../common/Icon/TrashBin';
import { reactFamily } from '../../../mockData';

export default {
  title: 'Shared/ProductList',
  component: ProductList,
  argTypes: {},
};

const Template = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  listTitle: '리액트 가족',
  products: reactFamily,
};

export const Cart = Template.bind({});
Cart.args = {
  products: reactFamily,
  isCheckbox: true,
  children: (
    <FlexContainer direction={'column'} justifyContent={'space-between'} align={'flex-end'}>
      <Button backgroundColor={'transparent'}>
        <TrashBin width={'1.5rem'} color={PALETTE.GRAY_002} />
      </Button>
      <AmountInput amount={1} setAmount={() => {}} />
      <p>30,000 원</p>
    </FlexContainer>
  ),
};

export const OrderList = Template.bind({});
OrderList.args = {
  products: reactFamily,
  imageSize: '7.5rem',
  listStyle: 'tableStyle',
  children: (
    <Button width={'8.6rem'} height={'3rem'} color={PALETTE.WHITE} backgroundColor={PALETTE.BAEMINT}>
      장바구니
    </Button>
  ),
};

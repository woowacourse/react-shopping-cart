import { FlexRow, WhiteSpace } from '@/style/common.style';

import CartItem from './CartItem';
import CheckBox from '../Button/CheckBoxButton';
import styled from '@emotion/styled';
import { useState } from 'react';

interface IF {
  id: number;
  isSelected: boolean;
}

const cartItems = [
  {
    id: 126,
    quantity: 1,
    product: {
      id: 2,
      name: '나이키',
      price: 1000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
  {
    id: 127,
    quantity: 1,
    product: {
      id: 10,
      name: '퓨마',
      price: 10000,
      imageUrl:
        'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
      category: 'fashion',
    },
  },
  {
    id: 128,
    quantity: 1,
    product: {
      id: 12,
      name: '컨버스',
      price: 20000,
      imageUrl:
        'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
      category: 'fashion',
    },
  },
  {
    id: 189,
    quantity: 1,
    product: {
      id: 3,
      name: '아디다스',
      price: 2000,
      imageUrl:
        'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
      category: 'fashion',
    },
  },
];

const CartList = () => {
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<IF[]>([
    { id: 1, isSelected: false },
    { id: 2, isSelected: true },
    { id: 3, isSelected: false },
    { id: 4, isSelected: false },
  ]);

  return (
    <StyledListWrapper>
      <StyledAllCheckBox>
        <CheckBox
          isSelected={isAllSelected}
          onClick={() => setIsAllSelected(!isAllSelected)}
        />
        <span>전체선택</span>
      </StyledAllCheckBox>
      <StyledList>
        {cartItems.map((item, index) => (
          <CartItem
            key={item.id}
            product={item.product}
            quantity={item.quantity}
            isSelected={isSelected[index].isSelected}
            handleSelected={() => {}}
            handleDelete={() => {}}
            handleQuantity={() => {}}
          />
        ))}
      </StyledList>
    </StyledListWrapper>
  );
};
export default CartList;

const StyledListWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledAllCheckBox = styled.div`
  ${FlexRow}
  gap: 5px;
  align-items: center;
`;

const StyledList = styled.ul`
  padding-inline-start: 0;
`;

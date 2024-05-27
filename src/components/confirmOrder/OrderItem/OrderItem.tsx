import { useRecoilValue } from 'recoil';
import { itemQuantityState } from '../../../recoil/atoms';

import { convertToLocaleAmount } from '../../../utils';
import { CartItem } from '../../../type';
import * as Styled from './OrderItem.style';

interface OrderItemProps {
  item: CartItem;
}

export default function OrderItem({ item }: OrderItemProps) {
  const itemQuantity = useRecoilValue(itemQuantityState(item.id));

  return (
    <Styled.OrderItemContainer>
      <Styled.OrderItemContent>
        <Styled.ProductImageBox src={item.product.imageUrl} alt={item.product.name} />
        <Styled.ProductInfoBox>
          <div>
            <Styled.ProductName>{item.product.name}</Styled.ProductName>
            <Styled.ProductPrice>{convertToLocaleAmount(item.product.price)}</Styled.ProductPrice>
            <Styled.ProductCount>{itemQuantity}개</Styled.ProductCount>
          </div>
        </Styled.ProductInfoBox>
      </Styled.OrderItemContent>
    </Styled.OrderItemContainer>
  );
}

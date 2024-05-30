import { SelectedCartItem } from '../../recoil/atoms';

import * as S from './styled';

interface OrderedItemProps {
  selectedItem: SelectedCartItem;
}

const OrderItem = ({ selectedItem }: OrderedItemProps) => {
  return (
    <S.Container>
      <S.Hr />
      <S.Contents>
        <S.ProductImage src={selectedItem.imageUrl} alt="product" />
        <S.ProductDescription>
          <S.ProductName>{selectedItem.name}</S.ProductName>
          <S.ProductPrice>{selectedItem.price.toLocaleString()}원</S.ProductPrice>
          <S.ProductQuantity>{selectedItem.quantity}개</S.ProductQuantity>
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default OrderItem;

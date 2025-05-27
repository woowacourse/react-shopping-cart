import * as S from './CartItem.styled';
import CheckBox from '@/shared/components/CheckBox/CheckBox';
import DefaultItemIcon from '@assets/icons/default-item.svg';
import CartItemQuantityButton from './Button/Quantity/CartItemQuantityButton';

export default function CartItem() {
  const price = 100000;
  const isChecked = true;

  return (
    <S.Item>
      <S.ItemHeader>
        <CheckBox isChecked={isChecked} />
        <S.DeleteButton type="button" onClick={() => {}}>
          삭제
        </S.DeleteButton>
      </S.ItemHeader>

      <S.ItemContent>
        <S.ItemImage
          src={DefaultItemIcon}
          alt="DefaultItemIcon"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = DefaultItemIcon;
          }}
        />
        <S.ItemDetail>
          <S.ItemDetailInfo>
            <S.ItemName>상품이름</S.ItemName>
            <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
          </S.ItemDetailInfo>
          <CartItemQuantityButton cartItemId={1} quantity={1} />
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}

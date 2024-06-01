import type { CartItemType, ProductType } from '../../types';

import MinusIcon from '../../assets/minusIcon.png';
import PlusIcon from '../../assets/plusIcon.png';
import * as S from './style';
import * as C from '../common/commonStyles';

import BorderButton from '../common/BorderButton';
import CheckBox from '../common/CheckBox';

import useDeleteCartItem from '../../hooks/useDeleteCartItem';
import useSelectCartItem from '../../hooks/useSelectCartItem';
import useQuantityControls from '../../hooks/useQuantityControls';
import { priceFormatter } from '../../utils/stringFormatter';

interface CartItemProps {
  cartItem: CartItemType;
  summary?: boolean;
}

export default function CartItem({
  cartItem: { id, product },
  summary = false,
}: CartItemProps) {
  return (
    <S.CartItemWrapper key={id}>
      {!summary && (
        <S.CartItemHeader>
          <CartItemHeader id={id} />
        </S.CartItemHeader>
      )}

      <S.CartItemContainer>
        <CartItemImage name={product.name} imageUrl={product.imageUrl} />

        <S.CartItemInfo>
          <CartItemDetails name={product.name} price={product.price} />

          <S.QuantityContainer>
            {summary ? (
              <CartItemQuantity id={id} />
            ) : (
              <CartItemQuantityControls id={id} />
            )}
          </S.QuantityContainer>
        </S.CartItemInfo>
      </S.CartItemContainer>
    </S.CartItemWrapper>
  );
}

function CartItemHeader({ id }: Pick<CartItemType, 'id'>) {
  const { handleDelete } = useDeleteCartItem(id);
  const { isSelected, toggleSelected } = useSelectCartItem(id);

  return (
    <>
      <CheckBox isSelected={isSelected} handleChange={toggleSelected} />
      <BorderButton className="deleteBtn" onClick={handleDelete} size="large">
        삭제
      </BorderButton>
    </>
  );
}

function CartItemImage({
  imageUrl,
  name,
}: Pick<ProductType, 'imageUrl' | 'name'>) {
  return <S.CartItemImage src={imageUrl} alt={name} />;
}

function CartItemDetails({ name, price }: Pick<ProductType, 'name' | 'price'>) {
  return (
    <>
      <S.ProductName>{name}</S.ProductName>
      <C.Price>{priceFormatter(price)}</C.Price>
    </>
  );
}

function CartItemQuantityControls({ id }: Pick<CartItemType, 'id'>) {
  const { quantity, increase, decrease } = useQuantityControls(id);

  return (
    <S.QuantityControls>
      <BorderButton onClick={decrease} size="small">
        <img src={MinusIcon} alt="감소 버튼 아이콘" />
      </BorderButton>

      <S.Quantity>{quantity}</S.Quantity>

      <BorderButton onClick={increase} size="small">
        <img src={PlusIcon} alt="증가 버튼 아이콘" />
      </BorderButton>
    </S.QuantityControls>
  );
}

function CartItemQuantity({ id }: Pick<CartItemType, 'id'>) {
  const { quantity } = useQuantityControls(id);

  return <S.Quantity>{quantity}개</S.Quantity>;
}

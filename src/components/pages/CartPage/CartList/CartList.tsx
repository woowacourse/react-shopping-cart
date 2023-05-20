import { useRecoilValue } from 'recoil';
import cartState from '../../../../recoil/cartState';
import CartSingleItem from '../CartItem/CartItem';
import CartAllCheckbox from '../CartAllCheckbox/CartAllCheckbox';
import DeleteSelectedButton from '../DeleteSelectedButton/DeleteSelectedButton';
import { toggledProductsSelector } from '../../../../recoil/cartToggleState';

import * as Styled from './CartList.styled';

const CartList = () => {
  const cart = useRecoilValue(cartState);
  const totalCount = Object.values(cart).length;
  const toggledCount = useRecoilValue(toggledProductsSelector).length;

  return (
    <Styled.CartListSection>
      <Styled.TotalCountParagraph>담은 상품 ({totalCount}개)</Styled.TotalCountParagraph>
      <ul>
        {Object.values(cart).map(({ id, quantity, product: { name, price, imageUrl } }) => (
          <CartSingleItem
            key={id}
            id={id}
            quantity={quantity}
            price={price}
            imageUrl={imageUrl}
            name={name}
          />
        ))}
      </ul>
      <Styled.SelectionDiv>
        <CartAllCheckbox />
        <Styled.SelectedCountParagraph>
          전체선택 ({toggledCount}/{totalCount})
        </Styled.SelectedCountParagraph>
        <DeleteSelectedButton />
      </Styled.SelectionDiv>
    </Styled.CartListSection>
  );
};

export default CartList;

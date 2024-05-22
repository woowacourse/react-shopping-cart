import { ProductType } from '../../type';
import * as Styled from './style';
import { CartItemDelete, CartItemQuantity } from './CartItemButton';
import { useRecoilValue } from 'recoil';
import { cartItemQuantityState } from '../../recoil/cartItems';

interface CartItemProp {
  id: number;
  cartItemProduct: ProductType;
  readonly: boolean;
}
const CartItem = ({ id, cartItemProduct, readonly }: CartItemProp) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(id));
  return (
    <Styled.Item>
      <>
        <Styled.Divider />
        <Styled.ButtonContainer>
          {!readonly && <CartItemDelete id={id} />}
        </Styled.ButtonContainer>
        <Styled.ItemInfoContainer>
          <Styled.ItemImg src={cartItemProduct.imageUrl} />
          <Styled.ItemInfo>
            <Styled.ItemDetails>
              <Styled.ItemName>{cartItemProduct.name}</Styled.ItemName>
              <Styled.ItemPrice>
                {cartItemProduct.price.toLocaleString('ko-kr')}원
              </Styled.ItemPrice>
            </Styled.ItemDetails>
            <Styled.ItemQuantityAdjustment>
              {readonly ? (
                <Styled.ItemQuantity>{cartItemQuantity}개</Styled.ItemQuantity>
              ) : (
                <CartItemQuantity id={id}>
                  {
                    <Styled.ItemQuantity>
                      {cartItemQuantity}
                    </Styled.ItemQuantity>
                  }
                </CartItemQuantity>
              )}
            </Styled.ItemQuantityAdjustment>
          </Styled.ItemInfo>
        </Styled.ItemInfoContainer>
      </>
    </Styled.Item>
  );
};

export default CartItem;

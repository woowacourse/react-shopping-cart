import styled from "@emotion/styled";
import {
  Cart,
  deleteCartItem,
  getShoppingCartData,
} from "../../../../../../api/cart";
import Image from "../../../../../../components/common/assets/Image";
import { useAPIDataContext } from "../../../../../../context/APIDataProvider";
import { useToastContext } from "../../../../../../context/ToastProvider";
import { formatKRWString } from "../../../../../../utils/formatKRWString";
import CartItemCheckbox from "./CartItemCheckbox";
import CartItemCounter from "./CartItemCounter";

interface CartCheckItemProps {
  cart: Cart;
}

function CartCheckItem({ cart }: CartCheckItemProps) {
  const { refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { showToast } = useToastContext();

  const removeItem = async (id: string) => {
    try {
      await deleteCartItem(id);
      await cartRefetch();
    } catch (e) {
      showToast("장바구니 아이템 삭제에 실패했습니다.", "error");
    }
  };

  return (
    <ItemWithCheckboxContainer key={cart.id}>
      <CartItemCheckbox cartId={cart.id} />
      <ItemContainer>
        <Image
          width="80px"
          height="80px"
          src={cart.product.imageUrl}
          altText={`${cart.product.name} 상품 이미지`}
        />

        <ProductInfo aria-label="상품 정보" role="cart-product-info">
          <ProductName>{cart.product.name}</ProductName>
          <ProductPrice>{formatKRWString(cart.product.price)}</ProductPrice>
          <CartItemCounter cart={cart} />
        </ProductInfo>

        <DeleteButton onClick={() => removeItem(cart.id)}>삭제</DeleteButton>
      </ItemContainer>
    </ItemWithCheckboxContainer>
  );
}

export default CartCheckItem;

const ItemWithCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  &:last-child {
    border-bottom: none;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: flex-start;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  align-items: flex-start;
`;

const ProductName = styled.p`
  text-align: left;
`;

const ProductPrice = styled.p``;

const DeleteButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fff;
  color: #666;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

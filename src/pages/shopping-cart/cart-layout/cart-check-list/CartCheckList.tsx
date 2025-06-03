import styled from '@emotion/styled';
import { deleteCartItem, patchCartItem } from '../../../../api/cart';
import CheckBox from '../../../../components/common/CheckBox';
import Counter from '../../../../components/common/Counter';
import Image from '../../../../components/common/Image';
import { useOrderListContext } from '../../context/OrderListProvider';
import { useContext } from 'react';
import { ToastContext } from '../../../../context/ToastProvider';

function CartCheckList() {
  const { cartListData, cartRefetch, selectionMap, setSelectionMap } =
    useOrderListContext();

  const { showToast } = useContext(ToastContext);

  const isCartEmpty = !cartListData || cartListData.length === 0;

  const isSelectAll = !Object.values(selectionMap).some(
    (isSelected) => !isSelected
  );
  const handleSelectAll = () => {
    setSelectionMap(() => {
      const nextMap: Record<string, boolean> = {};
      for (const cart of cartListData ?? []) {
        nextMap[cart.id] = !isSelectAll;
      }
      return nextMap;
    });
  };

  const handleToggleSelection = (cartId: string) => {
    setSelectionMap((prev) => ({
      ...prev,
      [cartId]: !prev[cartId],
    }));
  };

  const getCartItemById = (cartId: string) => {
    const cart = cartListData?.find((cart) => cart.id === cartId);
    if (!cart) throw new Error('장바구니에 해당 아이템이 없습니다.');
    return cart;
  };

  const handlePlusQuantity = async (cartId: string) => {
    try {
      if (!cartListData) return;
      const cart = getCartItemById(cartId);
      await patchCartItem(cartId, cart.quantity + 1, cartListData);
      await cartRefetch();
    } catch (e) {
      showToast('장바구니에 추가하는 데 실패했습니다.');
    }
  };

  const handleMinusQuantity = async (cartId: string) => {
    try {
      if (!cartListData) return;
      const cart = getCartItemById(cartId);
      await patchCartItem(cartId, cart.quantity - 1, cartListData);
      await cartRefetch();
    } catch (e) {
      showToast('장바구니에서 빼는 데 실패했습니다.');
    }
  };

  if (!cartListData) {
    return <LoadingCartItem>장바구니를 불러오는 중...</LoadingCartItem>;
  }

  const removeItem = async (id: string) => {
    try {
      await deleteCartItem(id);
      await cartRefetch();
    } catch (e) {
      showToast('장바구니 삭제에 실패했습니다.');
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}원`;
  };

  return (
    <Container>
      <CheckedAll>
        <CheckBox
          isChecked={isSelectAll}
          onToggle={() => handleSelectAll()}
          aria-label={'전체 선택 체크박스'}
          aria-checked={isSelectAll}
        ></CheckBox>
        <p>전체 선택</p>
      </CheckedAll>
      <ItemList>
        {isCartEmpty ? (
          <EmptyCartBox>
            <EmptyCartImage
              src={`${import.meta.env.BASE_URL}assets/DeleteCart.svg`}
            />
            <EmptyCartText>장바구니에 담긴 상품이 없습니다.</EmptyCartText>
          </EmptyCartBox>
        ) : (
          cartListData?.map((cart) => (
            <ItemWithCheckboxContainer key={cart.id}>
              <CheckBox
                isChecked={selectionMap[cart.id]}
                onToggle={() => handleToggleSelection(cart.id)}
                aria-label={'상품 선택 체크박스'}
                aria-checked={selectionMap[cart.id]}
              ></CheckBox>
              <ItemContainer>
                <Image
                  width='80px'
                  height='80px'
                  imageSource={cart.product.imageUrl}
                  altText={`${cart.product.name} 상품 이미지`}
                />

                <ProductInfo aria-label='상품 정보'>
                  <ProductName>{cart.product.name}</ProductName>
                  <ProductPrice>{formatPrice(cart.product.price)}</ProductPrice>
                  <Counter
                    canBeZero={false}
                    count={cart.quantity}
                    maxCount={cart.product.quantity}
                    onPlusClick={() => handlePlusQuantity(cart.id)}
                    onMinusClick={() => handleMinusQuantity(cart.id)}
                  />
                </ProductInfo>

                <DeleteButton onClick={() => removeItem(cart.id)}>
                  삭제
                </DeleteButton>
              </ItemContainer>
            </ItemWithCheckboxContainer>
          ))
        )}
      </ItemList>
    </Container>
  );
}

export default CartCheckList;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
`;

const LoadingCartItem = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemList = styled.div`
  height: 100%;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  margin-bottom: 32px;
  overflow-y: auto;
`;

const CheckedAll = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #bdbdbd;
`;

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

const EmptyCartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 32px;
`;

const EmptyCartImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  opacity: 0.3;
`;

const EmptyCartText = styled.p`
  width: 100%;
  color: grey;
`;

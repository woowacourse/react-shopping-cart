import styled from '@emotion/styled';
import { useOrderListContext } from '@/pages/shopping-cart/context/OrderListProvider';
import Image from '@/components/common/Image';

function OrderItemList() {
  const { cartListData, selectionMap } = useOrderListContext();
  const isCartEmpty = !cartListData || cartListData.length === 0;
  const orderList = (cartListData ?? []).filter(
    (cart) => selectionMap[cart.id] === true
  );

  if (!cartListData) {
    return <LoadingCartItem>장바구니를 불러오는 중...</LoadingCartItem>;
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}원`;
  };

  return (
    <Container>
      <ItemList>
        {isCartEmpty ? (
          <EmptyCartBox>
            <EmptyCartImage
              src={`${import.meta.env.BASE_URL}assets/DeleteCart.svg`}
            />
            <EmptyCartText>주문 목록이 없습니다.</EmptyCartText>
          </EmptyCartBox>
        ) : (
          orderList.map((order) => (
            <ItemWithCheckboxContainer key={order.id}>
              <ItemContainer>
                <Image
                  width='80px'
                  height='80px'
                  imageSource={order.product.imageUrl}
                  altText={`${order.product.name} 상품 이미지`}
                />

                <ProductInfo aria-label='상품 정보'>
                  <ProductName>{order.product.name}</ProductName>
                  <ProductPrice>
                    {formatPrice(order.product.price)}
                  </ProductPrice>
                  <ProductQuantity>{order.quantity}개</ProductQuantity>
                </ProductInfo>
              </ItemContainer>
            </ItemWithCheckboxContainer>
          ))
        )}
      </ItemList>
    </Container>
  );
}

export default OrderItemList;

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
  height: 260px;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
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
  font-weight: 500;
  font-size: 12px;
`;

const ProductPrice = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

const ProductQuantity = styled.p`
  color: grey;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
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

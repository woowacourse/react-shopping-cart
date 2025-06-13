import styled from "@emotion/styled";
import { getShoppingCartData } from "../../../../api/cart";
import { useAPIDataContext } from "../../../../context/APIDataProvider";
import { useOrderListContext } from "../../context/OrderListProvider";
import Image from "../../../../components/common/assets/Image";
import { formatKRWString } from "../../../../utils/formatKRWString";

function OrderList() {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { orderIdList } = useOrderListContext(cartListData);

  return (
    <Container>
      {orderIdList.map((id) => {
        const cart = (cartListData ?? []).find((cart) => cart.id === id);
        if (!cart) return null;
        return (
          <ItemWithCheckboxContainer key={id}>
            <ItemContainer>
              <Image
                width="80px"
                height="80px"
                src={cart.product.imageUrl}
                altText={`${cart.product.name} 상품 이미지`}
              />

              <ProductInfo aria-label="상품 정보" role="cart-product-info">
                <NamePriceContainer>
                  <ProductName>{cart.product.name}</ProductName>
                  <ProductPrice>
                    {formatKRWString(cart.product.price)}
                  </ProductPrice>
                </NamePriceContainer>
                <ProductQuantity>{cart.quantity}개</ProductQuantity>
              </ProductInfo>
            </ItemContainer>
          </ItemWithCheckboxContainer>
        );
      })}
    </Container>
  );
}

export default OrderList;

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
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

const NamePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 4px 0;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  justify-content: space-between;

  align-items: flex-start;
`;

const ProductName = styled.p`
  text-align: left;
`;

const ProductPrice = styled.p``;

const ProductQuantity = styled.p`
  font-size: 14px;
  color: #888;
`;

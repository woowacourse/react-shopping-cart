import styled from "@emotion/styled";
import { getShoppingCartData } from "../../../../api/cart";
import { Flex } from "../../../../components/common";
import { useAPIDataContext } from "../../../../context/APIDataProvider";

const CartTitle = () => {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });

  return (
    <Flex gap="sm" alignItems="flex-start">
      <Title>장바구니</Title>
      <CartCountInfoText>
        {cartListData &&
          cartListData.length !== 0 &&
          `현재 ${cartListData.length}종류의 상품이 담겨있습니다.`}
      </CartCountInfoText>
    </Flex>
  );
};

export default CartTitle;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const CartCountInfoText = styled.p`
  font-size: 14px;
`;

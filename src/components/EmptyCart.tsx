import { FlexCenter, FlexColumn, WhiteSpace } from "@/style/common.style";
import { getCartList, postCartItem } from "@/api/cartItem";

import { ALL_PRODUCTS_IDS } from "@/constants/system";
import BorderButton from "./common/Button/BorderButton";
import { CART_MESSAGE } from "@/constants/message";
import FullWidthButton from "@/components/common/Button/FullWidthButton";
import { cartListState } from "@/store/atoms/atoms";
import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";

const EmptyCart = () => {
  const setCartList = useSetRecoilState(cartListState);
  const refreshCartList = async () => {
    const newList = await getCartList();
    setCartList(newList);
  };

  const addAllProducts = () => {
    const postData = async (productId: number) => {
      await postCartItem(productId);
    };

    ALL_PRODUCTS_IDS.forEach((id) => {
      postData(id);
    });

    refreshCartList();
  };

  return (
    <>
      <StyledEmptyWrapper>
        <StyledTitle>장바구니</StyledTitle>
        <StyledCenterBox>
          {CART_MESSAGE.emptyCart}
          <BorderButton onClick={addAllProducts}>모든 상품 담기</BorderButton>
        </StyledCenterBox>
      </StyledEmptyWrapper>
      <StyledFixedBottom>
        <FullWidthButton onClick={() => {}} disabled>
          주문 확인
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};

export default EmptyCart;

const StyledEmptyWrapper = styled.div`
  position: absolute;
  margin-top: 64px;
  ${WhiteSpace}
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
`;

const StyledCenterBox = styled.div`
  inset: 0;
  position: fixed;
  translate: calc(-50%, -50%);
  ${FlexCenter}
  ${FlexColumn}
  gap:16px;
`;

const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  bottom: 0;
`;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCartProductList, setCartProductList } from 'store/cartProductList/actions';
import { RootState } from 'store';
import { loadCartProductList } from 'api';
import styled from 'styled-components';
import Bar from 'components/common/Bar';
import Text from 'components/common/Text';
import CartProduct from 'components/CartProduct';
import Flex from 'components/common/Flex';
import { ReactComponent as UncheckBoxIcon } from 'assets/icon/UncheckBox.svg';
import { ReactComponent as CheckBoxIcon } from 'assets/icon/CheckBox.svg';
import Button, { OrderButton } from 'components/common/Button';
import MarginWrapper from 'components/common/MarginWrapper';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartProductList, isLoading } = useSelector(
    (state: RootState) => state.cartProductListReducer,
  );

  useEffect(() => {
    // 상태가 변경되지 않았으면 return;

    dispatch(startCartProductList());
    loadCartProductList().then((res) => dispatch(setCartProductList(res)));
  }, []);

  return (
    <Styled.Container>
      <MarginWrapper mb={30}>
        <Text color="black" size={32} weight="bold" align="center">
          장바구니
        </Text>
      </MarginWrapper>
      <Bar h={4} color="black" />
      <Styled.Content>
        <Flex justify="space-between">
          <Styled.CartListBox>
            <MarginWrapper mb={50}>
              <Flex justify="space-between">
                <Flex align="center" gap={12}>
                  <UncheckBoxIcon />
                  <Text>선택해제</Text>
                </Flex>
                <Button w={117} h={50} borderWidth={1} borderStyle="solid" borderColor="gray">
                  상품삭제
                </Button>
              </Flex>
            </MarginWrapper>
            <MarginWrapper mb={16}>
              <Text>배송 상품 ({cartProductList.length}개)</Text>
            </MarginWrapper>
            {cartProductList &&
              cartProductList.map((cartProduct) => (
                <CartProduct key={cartProduct.id} data={cartProduct} />
              ))}
          </Styled.CartListBox>
          <Styled.OrderBox>
            <Styled.OrderWrapper>
              <MarginWrapper mb={20}>
                <Text size={24}>결제예상금액</Text>
              </MarginWrapper>
              <Bar color="gray" h={3} />
              <MarginWrapper mt={34} mb={68}>
                <Flex justify="space-between">
                  <Text size={20} weight={700}>
                    결제예상금액
                  </Text>
                  <Text size={20} weight={700}>
                    21,700원
                  </Text>
                </Flex>
              </MarginWrapper>
              <OrderButton w={388} h={73} bgColor="mint">
                주문하기(2개)
              </OrderButton>
            </Styled.OrderWrapper>
          </Styled.OrderBox>
        </Flex>
      </Styled.Content>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div``,
  Content: styled.div`
    margin-top: 53px;
  `,
  CartListBox: styled.div`
    width: 736px;
  `,
  OrderBox: styled.div`
    width: 448px;
  `,
  OrderWrapper: styled.div`
    width: 448px;
    height: 318px;
    border: 1px solid #dddddd;
    padding: 22px 30px;
  `,
};

export default CartPage;

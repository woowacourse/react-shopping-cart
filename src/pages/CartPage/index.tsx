import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCartProductList, setCartProductList } from 'store/cartProductList/actions';
import { RootState } from 'store';
import { loadCartProductList } from 'api';
import styled from 'styled-components';
import Bar from 'components/@common/Bar';
import Text from 'components/@common/Text';
import CartProduct from 'components/CartProduct';
import Flex from 'components/@common/Flex';
import { ReactComponent as UncheckBoxIcon } from 'assets/icon/UncheckBox.svg';
import { ReactComponent as CheckBoxIcon } from 'assets/icon/CheckBox.svg';
import Button, { OrderButton } from 'components/@common/Button';
import MarginWrapper from 'components/@common/MarginWrapper';

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
      <MarginWrapper mb="30px">
        <Text color="black" size="32px" weight="bold" align="center">
          장바구니
        </Text>
      </MarginWrapper>
      <Bar h="4px" color="black" />
      <Styled.Content>
        <Flex justify="space-between">
          <Styled.CartListBox>
            <MarginWrapper mb="50px">
              <Flex justify="space-between">
                <Flex align="center" gap="12px">
                  <UncheckBoxIcon />
                  <Text>선택해제</Text>
                </Flex>
                <Button w="117px" h="50px" borderWidth="1px" borderStyle="solid" borderColor="gray">
                  상품삭제
                </Button>
              </Flex>
            </MarginWrapper>
            <MarginWrapper mb="16px">
              <Text>배송 상품 ({cartProductList.length}개)</Text>
            </MarginWrapper>
            {cartProductList &&
              cartProductList.map((cartProduct) => (
                <CartProduct key={cartProduct.id} data={cartProduct} />
              ))}
          </Styled.CartListBox>
          <Styled.OrderBox>
            <Styled.OrderWrapper>
              <MarginWrapper mb="20px">
                <Text size="24px">결제예상금액</Text>
              </MarginWrapper>
              <Bar color="gray" h="3px" />
              <MarginWrapper mt="34px" mb="68px">
                <Flex justify="space-between">
                  <Text size="20px" weight={700}>
                    결제예상금액
                  </Text>
                  <Text size="20px" weight={700}>
                    21,700원
                  </Text>
                </Flex>
              </MarginWrapper>
              <OrderButton w="388px" h="73px" bgColor="mint">
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

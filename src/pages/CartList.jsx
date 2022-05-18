import Button from 'components/@common/Button/styles';
import CheckBox from 'components/@common/CheckBox';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import CartProducItem from 'components/CartProductItem';
import Layout from 'components/Layout';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { COLORS } from 'styles/theme';
import { CartListContainer, CartListReceiptContainer } from './styles';

const CartList = () => {
  const { items: cartList } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log('장바구니 진입');
    console.log(cartList);
  }, []);

  return (
    <Layout>
      <CartListContainer>
        <CommonStyled.PageTitle>장바구니</CommonStyled.PageTitle>
        <CommonStyled.HR color={COLORS.BLACK} />
        <CommonStyled.FlexWrapper alignItems="flex-start">
          <CommonStyled.FlexWrapper margin="2rem" flexDirection="column" alignItems="flex-start">
            <CommonStyled.FlexWrapper justifyContent="space-between" margin="1rem 0 2rem 0">
              <CheckBox>전체선택</CheckBox>
              <Button width="7rem" height="40px" margin="0" size="1rem" weight="normal">
                상품삭제
              </Button>
            </CommonStyled.FlexWrapper>
            <p>싱싱배송 상품 (?개)</p>
            <CommonStyled.HR />
            {cartList &&
              cartList.map(({ id, name, thumbnail, price }) => (
                <>
                  <CartProducItem
                    key={id}
                    id={id}
                    name={name}
                    thumbnail={thumbnail}
                    price={price}
                  />
                  <CommonStyled.HR size="1px" />
                </>
              ))}
          </CommonStyled.FlexWrapper>
          <CartListReceiptContainer flexDirection="column" width="60%" alignItems="flex-start">
            <CommonStyled.FlexWrapper padding="1.5rem">
              <CommonStyled.Text>결제예상금액</CommonStyled.Text>
            </CommonStyled.FlexWrapper>
            <CommonStyled.HR margin="0" />
            <CommonStyled.FlexWrapper flexDirection="column" padding="1.5rem">
              <CommonStyled.FlexWrapper justifyContent="space-between">
                <CommonStyled.Text weight="bold" size="0.8rem">
                  결제예상금액
                </CommonStyled.Text>
                <CommonStyled.Text weight="bold" size="0.8rem">
                  10,000원
                </CommonStyled.Text>
              </CommonStyled.FlexWrapper>
              <Button height="60px" margin="3rem 0 0 0" size="1.2rem" weight="normal">
                주문하기(?개)
              </Button>
            </CommonStyled.FlexWrapper>
          </CartListReceiptContainer>
        </CommonStyled.FlexWrapper>
      </CartListContainer>
    </Layout>
  );
};

export default CartList;

import FlexContainer from 'components/@common/FlexContainer';
import Button from 'components/@common/Button';
import Checkbox from 'components/@common/Checkbox';
import ToolTip from 'components/@common/ToolTip';
import Icon from 'components/@common/Icon';
import Title from 'components/@common/Title';
import TextUnderline from 'components/@common/TextUnderline';
import CartItem from 'components/CartItem';

import { ICON_CODE } from 'constants/';
import * as S from './styles';

export function CartList() {
  return (
    <>
      <Title description="구매할 상품을 체크한 후 우측의 주문하기를 누르시면 상품을 주문할 수 있어요!">
        <Icon icon={ICON_CODE.CART} />
        장바구니
      </Title>

      <S.Container>
        <FlexContainer gap={16}>
          <S.ControllerContainer>
            <Checkbox size="medium">선택 해제</Checkbox>
            <ToolTip text="선택한 상품을 장바구니에서 삭제합니다." align="bottom">
              <Button icon={ICON_CODE.TRASH}>상품 삭제</Button>
            </ToolTip>
          </S.ControllerContainer>

          <FlexContainer>
            <Title type="content" size={14}>
              장바구니 상품 <TextUnderline>(7개 담김)</TextUnderline>
            </Title>

            <FlexContainer direction="column" justify="center">
              <CartItem
                id="1"
                image="https://cdn-mart.baemin.com/sellergoods/list/374ca49e-99a3-4070-8b62-178a27d2fa1c.jpg"
                name="테스트 상품"
                price="50000"
              />
              <CartItem
                id="1"
                image="https://cdn-mart.baemin.com/sellergoods/list/374ca49e-99a3-4070-8b62-178a27d2fa1c.jpg"
                name="테스트 상품"
                price="50000"
              />
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="column">
          <S.OrderContainer>
            <Title type="content" size={18}>
              상품 주문하기
            </Title>

            <FlexContainer direction="row" justify="space-between">
              <TextUnderline>결제 예상 금액</TextUnderline>
              <TextUnderline>21,700원</TextUnderline>
            </FlexContainer>

            <FlexContainer>
              <Button state="primary">주문하기 (2개)</Button>
            </FlexContainer>
          </S.OrderContainer>
        </FlexContainer>
      </S.Container>
    </>
  );
}
export default CartList;

import FlexBox from 'components/@common/FlexBox';
import { ProductOrderTable } from 'components/Payments/ProductOrderTable';
import { CartProductCardList } from 'components/ProductCardList/CartProductCardList';
import { useRecoilValue } from 'recoil';
import { cartProductCountState, cartState } from 'state/CartAtom';
import styled from 'styled-components';
import { flexRow } from 'styles/mixin';

export const CartPage = () => {
  const cartProducts = useRecoilValue(cartState);
  const cartProductsCount = useRecoilValue(cartProductCountState);

  return (
    <>
      <TitleWrapper>
        <h1>장바구니</h1>
      </TitleWrapper>
      <CartListTitleWrapper>
        <FlexBox align="center" gap="10px">
          <CheckAllCheckBox type="checkbox" />
          <CheckAllCheckBoxText>전체선택(2/{cartProductsCount})</CheckAllCheckBoxText>
          <RemoveButton>선택삭제</RemoveButton>
        </FlexBox>
        <CartListTitle>배송 상품 ({cartProductsCount}개)</CartListTitle>
      </CartListTitleWrapper>
      <FlexBox justify="space-around" gap="70px">
        <FlexBox direction="column" width="600px" margin="10px 0">
          <CartProductCardList cartProducts={cartProducts} />
        </FlexBox>
        <FlexBox margin="30px 0" style={{ position: 'sticky', top: '95px' }}>
          <ProductOrderTable onClickOrderButton={() => {}} />
        </FlexBox>
      </FlexBox>
    </>
  );
};

const TitleWrapper = styled.div`
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray_10};

  h1 {
    font-size: 24px;
    text-align: center;
  }
`;

const CartListTitleWrapper = styled.div`
  ${flexRow}

  gap: 20px;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.gray_0};
`;
const CartListTitle = styled.span`
  font-size: 20px;
  margin-left: 50px;
`;

const CheckAllCheckBox = styled.input`
  transform: scale(1.8);
`;

const CheckAllCheckBoxText = styled.span`
  letter-spacing: 0.5px;
`;

const RemoveButton = styled.button`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray_9};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray_0};

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.8);
  }
`;

import FlexBox from 'components/@common/FlexBox';
import { ProductOrderTable } from 'components/Payments/ProductOrderTable';
import { CartProductCardList } from 'components/ProductCardList/CartProductCardList';
import styled from 'styled-components';
import { flexRow } from 'styles/mixin';

export const CartPage = () => {
  return (
    <>
      <TitleWrapper>
        <h1>장바구니</h1>
      </TitleWrapper>
      <CartListTitleWrapper>
        <FlexBox align="center" gap="10px">
          <CheckAllCheckBox type="checkbox" />
          <CheckAllCheckBoxText>전체선택(2/3)</CheckAllCheckBoxText>
          <RemoveButton>선택삭제</RemoveButton>
        </FlexBox>
        <CartListTitle>배송 상품 (3개)</CartListTitle>
      </CartListTitleWrapper>

      <FlexBox justify="space-around" gap="70px">
        <FlexBox direction="column">
          <FlexBox direction="column" width="600px" margin="10px 0">
            <CartProductCardList
              cartProducts={[
                {
                  id: 1,
                  quantity: 1,
                  product: {
                    id: 1,
                    name: '순살치킨 해마로 1kg 냉동',
                    price: 10800,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
                  },
                },
                {
                  id: 2,
                  quantity: 2,
                  product: {
                    id: 2,
                    name: '사조오양 치킨텐더 1000gx1개',
                    price: 9900,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/f9923d11-5ba9-4301-a73c-fc4817544f6a.jpg?h=400&w=400',
                  },
                },
                {
                  id: 3,
                  quantity: 3,
                  product: {
                    id: 3,
                    name: '사세통상 순살치킨가라아게(냉동 1kg/ea)',
                    price: 10000,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/ca728030-5e96-45f7-aa25-b7ebc0a1de7a.jpg?h=400&w=400',
                  },
                },
                {
                  id: 1,
                  quantity: 1,
                  product: {
                    id: 1,
                    name: '순살치킨 해마로 1kg 냉동',
                    price: 10800,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
                  },
                },
                {
                  id: 2,
                  quantity: 2,
                  product: {
                    id: 2,
                    name: '사조오양 치킨텐더 1000gx1개',
                    price: 9900,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/f9923d11-5ba9-4301-a73c-fc4817544f6a.jpg?h=400&w=400',
                  },
                },
                {
                  id: 3,
                  quantity: 3,
                  product: {
                    id: 3,
                    name: '사세통상 순살치킨가라아게(냉동 1kg/ea)',
                    price: 10000,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/ca728030-5e96-45f7-aa25-b7ebc0a1de7a.jpg?h=400&w=400',
                  },
                },
                {
                  id: 1,
                  quantity: 1,
                  product: {
                    id: 1,
                    name: '순살치킨 해마로 1kg 냉동',
                    price: 10800,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
                  },
                },
                {
                  id: 2,
                  quantity: 2,
                  product: {
                    id: 2,
                    name: '사조오양 치킨텐더 1000gx1개',
                    price: 9900,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/f9923d11-5ba9-4301-a73c-fc4817544f6a.jpg?h=400&w=400',
                  },
                },
                {
                  id: 3,
                  quantity: 3,
                  product: {
                    id: 3,
                    name: '사세통상 순살치킨가라아게(냉동 1kg/ea)',
                    price: 10000,
                    imageUrl:
                      'https://cdn-mart.baemin.com/sellergoods/main/ca728030-5e96-45f7-aa25-b7ebc0a1de7a.jpg?h=400&w=400',
                  },
                },
              ]}
            />
          </FlexBox>
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

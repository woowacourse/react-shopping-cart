import { api } from 'apis/products/api';
import FlexBox from 'components/@common/FlexBox';
import { ProductOrderTable } from 'components/Payments/ProductOrderTable';
import { CartProductCardList } from 'components/ProductCardList/CartProductCardList';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  areCartProductsAllCheckedState,
  cartProductsCheckedCountState,
  cartProductsCountState,
  cartState,
  checkedCartProductsPriceSumState,
} from 'state/CartAtom';
import styled from 'styled-components';
import { flexColumn, flexRow } from 'styles/mixin';
import { CartProduct } from 'types/product';

export const CartPage = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartState);
  const cartProductsCount = useRecoilValue(cartProductsCountState);
  const cartProductsCheckedCount = useRecoilValue(cartProductsCheckedCountState);
  const checkedCartProductsPriceSum = useRecoilValue(checkedCartProductsPriceSumState);
  const areCartProductsAllChecked = useRecoilValue(areCartProductsAllCheckedState);

  const deleteCheckedCartProducts = () => {
    const updatedCartProducts: CartProduct[] = [];

    cartProducts.forEach((cartProduct) => {
      cartProduct.checked ? api.deleteCartProduct(cartProduct.id) : updatedCartProducts.push(cartProduct);
    });

    setCartProducts(updatedCartProducts);
  };

  const toggleCheckAllButton = () => {
    const updatedCartProducts: CartProduct[] = [];

    if (areCartProductsAllChecked) {
      cartProducts.forEach((cartProduct) => {
        const updatedCartProduct: CartProduct = { ...cartProduct, checked: false };

        updatedCartProducts.push(updatedCartProduct);
        api.updateCartProduct(updatedCartProduct);
      });
    } else {
      cartProducts.forEach((cartProduct) => {
        const updatedCartProduct: CartProduct = { ...cartProduct, checked: true };

        updatedCartProducts.push(updatedCartProduct);
        api.updateCartProduct(updatedCartProduct);
      });
    }

    setCartProducts(updatedCartProducts);
  };

  return (
    <Container>
      <TitleWrapper>
        <h1>장바구니</h1>
      </TitleWrapper>
      <ContentContainer>
        <FlexBox direction="column" width="600px" margin="10px 0" gap="15px">
          <CheckBoxContainer>
            <CheckAllCheckBox onClick={toggleCheckAllButton} checked={areCartProductsAllChecked} type="checkbox" />
            <CheckAllCheckBoxText>
              전체선택({cartProductsCheckedCount}/{cartProductsCount})
            </CheckAllCheckBoxText>
            <RemoveButton onClick={deleteCheckedCartProducts}>선택삭제</RemoveButton>
          </CheckBoxContainer>
          <Line />
          <CartProductCardList cartProducts={cartProducts} />
        </FlexBox>
        <ProductOrderTableWrapper>
          <ProductOrderTable
            priceSum={checkedCartProductsPriceSum}
            deliveryFee={cartProductsCheckedCount > 0 ? 3000 : 0}
            productsCount={cartProductsCheckedCount}
            onClickOrderButton={() => {}}
          />
        </ProductOrderTableWrapper>
      </ContentContainer>
    </Container>
  );
};
const Container = styled.div``;

const TitleWrapper = styled.div`
  padding-bottom: 20px;

  h1 {
    font-size: 24px;
    text-align: center;
  }
`;

const ContentContainer = styled.div`
  ${flexRow}

  justify: space-around;
  gap: 70px;

  @media (max-width: 1100px) {
    ${flexColumn}

    gap: 20px;
  }
`;

const CheckBoxContainer = styled(FlexBox)`
  ${flexRow}

  gap: 20px;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray_0};
  align: center;
`;

const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_8};
  width: 100%;
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

const ProductOrderTableWrapper = styled.div`
  position: sticky;
  width: 400px;
  height: 100%;
  margin-top: 50px;
  top: 95px;
  z-index: 1;

  @media (max-width: 1100px) {
    width: 100%;
    margin-top: 0;
  }
`;

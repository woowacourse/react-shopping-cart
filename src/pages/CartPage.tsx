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
import { flexRow } from 'styles/mixin';
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
    <>
      <TitleWrapper>
        <h1>장바구니</h1>
      </TitleWrapper>
      <CartListTitleWrapper>
        <FlexBox align="center" gap="10px">
          <CheckAllCheckBox onClick={toggleCheckAllButton} checked={areCartProductsAllChecked} type="checkbox" />
          <CheckAllCheckBoxText>
            전체선택({cartProductsCheckedCount}/{cartProductsCount})
          </CheckAllCheckBoxText>
          <RemoveButton onClick={deleteCheckedCartProducts}>선택삭제</RemoveButton>
        </FlexBox>
      </CartListTitleWrapper>
      <FlexBox justify="space-around" gap="70px">
        <FlexBox direction="column" width="600px" margin="10px 0">
          <CartProductCardList cartProducts={cartProducts} />
        </FlexBox>
        <FlexBox margin="30px 0" style={{ position: 'sticky', top: '95px', width: '400px' }}>
          <ProductOrderTable
            priceSum={checkedCartProductsPriceSum}
            deliveryFee={cartProductsCheckedCount > 0 ? 3000 : 0}
            productsCount={cartProductsCheckedCount}
            onClickOrderButton={() => {}}
          />
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

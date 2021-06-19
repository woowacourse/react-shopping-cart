import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGES } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';
import {
  changeAllCheckboxesInCart,
  changeAmount,
  removeCheckedProducts,
  removeProduct,
  toggleCartCheckbox,
} from '../../../redux/Cart/actions';
import AmountInput from '../../common/AmountInput';
import Button from '../../common/Button';
import Checkbox from '../../common/Checkbox';
import FlexContainer from '../../common/FlexContainer';
import TrashBin from '../../common/Icon/TrashBin';
import Main from '../../Main';
import PageTitle from '../../shared/PageTitle';
import PriceInfoBox from '../../shared/PriceInfoBox';
import ProductList from '../../shared/ProductList';
import ProductListItem from '../../shared/ProductList/ProductListItem';
import * as Styled from './style';

const CartPage = () => {
  const [isAllChecked, setIsAllChecked] = useState(true);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((sum, product) => (sum += product.isChecked ? product.price * product.amount : 0), 0);

  const onChangeCheckbox = (productId) => {
    dispatch(toggleCartCheckbox(productId));
  };

  const onChangeAllCheckbox = () => {
    setIsAllChecked(!isAllChecked);
    dispatch(changeAllCheckboxesInCart(!isAllChecked));
  };

  const onRemoveCheckedProducts = () => {
    dispatch(removeCheckedProducts());
  };

  const onRemoveProduct = ({ target }) => {
    const productId = target.closest('div[data-product-id]').dataset.productId;
    dispatch(removeProduct(productId));
  };

  const onChangeAmount = (productId) => (amount) => {
    dispatch(changeAmount(productId, amount));
  };

  useEffect(() => {
    dispatch(changeAllCheckboxesInCart(true));
  }, []);

  useEffect(() => {
    if (cart.length === 0) return;

    if (isAllChecked && cart.some((product) => !product.isChecked)) {
      setIsAllChecked(false);
    }

    if (!isAllChecked && cart.some((product) => product.isChecked)) {
      setIsAllChecked(true);
    }
  }, [cart]);

  return (
    <Main>
      <PageTitle>{PAGES.CART.name}</PageTitle>
      <FlexContainer align="flex-start">
        <FlexContainer width="58%" margin="3rem auto 0 1.5rem" direction="column">
          <FlexContainer justifyContent="space-between" align="flex-start">
            <Checkbox onChange={onChangeAllCheckbox} isChecked={isAllChecked}>
              {isAllChecked ? '선택해제' : '전체선택'}
            </Checkbox>
            <Button
              onClick={onRemoveCheckedProducts}
              backgroundColor={PALETTE.WHITE}
              borderColor={PALETTE.GRAY_002}
              width="7.3rem"
              height="3rem"
            >
              상품삭제
            </Button>
          </FlexContainer>
          <Styled.ProductListTitle>든든배송 상품 ({cart.length}개)</Styled.ProductListTitle>
          <ProductList width="100%">
            {cart.map((product) => (
              <ProductListItem
                key={product.id}
                listStyle="lineStyle"
                isCheckbox={true}
                onChange={onChangeCheckbox}
                imageSize="9rem"
                product={product}
              >
                <div data-product-id={product.id}>
                  <FlexContainer height="100%" direction="column" justifyContent="space-between" align="flex-end">
                    <Button type="button" onClick={onRemoveProduct} backgroundColor="transparent">
                      <TrashBin width="1.5rem" color={PALETTE.GRAY_002} />
                    </Button>
                    <AmountInput amount={product.amount} min={1} setAmount={onChangeAmount(product.id)} />
                    <p>{Number(product.price).toLocaleString()} 원</p>
                  </FlexContainer>
                </div>
              </ProductListItem>
            ))}
          </ProductList>
        </FlexContainer>
        <PriceInfoBox
          width="30%"
          margin="6rem 1.5rem 0 auto"
          title="결제예상금액"
          priceInfo={{ name: '결제예상금액', price: totalPrice }}
          submitInfo={{
            text: '주문하기',
            address: PAGES.CHECKOUT.address,
          }}
        />
      </FlexContainer>
    </Main>
  );
};

export default CartPage;

import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  OptionContainer,
  ShoppingCartContainer,
  ShoppingCartListTitle,
  ShoppingCartList,
  PaymentInfoBoxContainer,
  DeleteButton,
  EmptyPageImage,
} from './ShoppingCartPage.styles';
import { ROUTE, CONFIRM_MESSAGE, AMOUNT_COUNTER_FLAG } from '../../constants';
import {
  updateShoppingCartItemsAsync,
  updateCheckedProductItems,
  increaseProductAmount,
  decreaseProductAmount,
  updateProductAmount,
} from '../../redux/action';
import { numberWithCommas } from '../../utils';
import { CheckBox, PaymentInfoBox } from '../../components';

import emptyImage from '../../assets/img/empty_page.png';
import PageHeader from '../../styles/PageHeader';
import { ShoppingCartItem } from '../../components/templates';
import ScreenContainer from '../../styles/ScreenContainer';

const ShoppingCartPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    myShoppingCartId,
    myShoppingCartProductIds,
    productList,
    checkedProductList,
    productAmountDict,
  } = useSelector(state => ({
    myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
    productList: state.productListReducer.productList,
    checkedProductList: state.checkedProductReducer.checkedProductList,
    productAmountDict: state.productAmountDictReducer.productAmountDict,
  }));

  const [isAllChecked, setAllChecked] = useState(false);

  const expectedPrice = checkedProductList.reduce((acc, productId) => {
    const amount = productAmountDict[productId] || 0;
    const { price } = productList.find(product => product.id === productId);

    return acc + price * amount;
  }, 0);

  const onClickAllCheckBox = () => {
    const newAllCheckedState = !isAllChecked;
    if (newAllCheckedState) {
      dispatch(updateCheckedProductItems([...myShoppingCartProductIds]));
    } else {
      dispatch(updateCheckedProductItems([]));
    }

    setAllChecked(newAllCheckedState);
  };

  const onClickCheckBox = event => {
    const { target } = event;

    if (target.checked) {
      dispatch(updateCheckedProductItems([...checkedProductList, target.id]));
    } else {
      dispatch(updateCheckedProductItems(checkedProductList.filter(productId => productId !== target.id)));
    }
  };

  const onClickDeleteButton = targetId => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    if (targetId) {
      const newContent = { productIdList: myShoppingCartProductIds.filter(productId => productId !== targetId) };

      Promise.all([
        dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)),
        dispatch(updateProductAmount(targetId)),
      ]).then(() =>
        dispatch(
          updateCheckedProductItems(checkedProductList.filter(checkedProductId => checkedProductId !== targetId))
        )
      );
    } else {
      const newContent = {
        productIdList: myShoppingCartProductIds.filter(productId => !checkedProductList.includes(productId)),
      };

      Promise.all([
        dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)),
        ...myShoppingCartProductIds.map(productId => dispatch(updateProductAmount(productId))),
      ]).then(() => dispatch(updateCheckedProductItems([])));
    }
  };

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.PURCHASE)) return;

    const newContent = {
      productIdList: myShoppingCartProductIds.filter(productId => !checkedProductList.includes(productId)),
    };
    const checkedItemList = [...checkedProductList].map(id => ({ id, amount: productAmountDict[id] }));

    Promise.all([
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)),
      ...checkedProductList.map(productId => dispatch(updateProductAmount(productId))),
    ]).then(() => dispatch(updateCheckedProductItems([])));

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: {
        checkedItemList,
      },
    });
  };

  const onClickAmountCounter = (productId, flag) => {
    if (flag === AMOUNT_COUNTER_FLAG.UP) {
      dispatch(increaseProductAmount(productId));
    } else if (flag === AMOUNT_COUNTER_FLAG.DOWN) {
      dispatch(decreaseProductAmount(productId));
    }
  };

  return (
    <ScreenContainer route={location.pathname}>
      <PageHeader>장바구니</PageHeader>
      <Container>
        {myShoppingCartProductIds.length === 0 ? (
          <EmptyPageImage src={emptyImage} alt="empty page" />
        ) : (
          <>
            <ShoppingCartContainer>
              <OptionContainer>
                <CheckBox id="all-check" onClick={onClickAllCheckBox} isChecked={isAllChecked} />
                <span>모두선택</span>
                <DeleteButton onClick={() => onClickDeleteButton()} disabled={!checkedProductList.length}>
                  상품삭제
                </DeleteButton>
              </OptionContainer>

              <ShoppingCartListTitle>{`장바구니 상품 (${myShoppingCartProductIds.length}개)`}</ShoppingCartListTitle>

              <ShoppingCartList>
                {myShoppingCartProductIds.map(productId => {
                  const { img, name, price } = productList.find(({ id }) => id === productId);

                  if (!productAmountDict[productId]) {
                    dispatch(updateProductAmount(productId));
                  }

                  return (
                    <ShoppingCartItem
                      key={productId}
                      productId={productId}
                      onClickCheckBox={onClickCheckBox}
                      onClickDeleteButton={onClickDeleteButton}
                      onClickAmountCounter={onClickAmountCounter}
                      img={img}
                      name={name}
                      price={price}
                      amount={productAmountDict[productId] || 1}
                      isChecked={checkedProductList.includes(productId)}
                    />
                  );
                })}
              </ShoppingCartList>
            </ShoppingCartContainer>

            <PaymentInfoBoxContainer>
              <PaymentInfoBox
                title="결제예상금액"
                detailText="결제예상금액"
                price={`${numberWithCommas(expectedPrice)} 원`}
                buttonText={`주문하기(${checkedProductList.length}개)`}
                onClickPaymentButton={onClickPaymentButton}
                isPaymentButtonDisable={!checkedProductList.length}
              />
            </PaymentInfoBoxContainer>
          </>
        )}
      </Container>
    </ScreenContainer>
  );
};

export default ShoppingCartPage;

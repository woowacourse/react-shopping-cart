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
  ShoppingCartItemContainer,
  ShoppingCartItem,
  ShoppingCartItemOption,
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
import { numberWithCommas } from '../../shared/utils';
import { AmountCounter, CheckBox, PaymentInfoBox, RowProductItem, TrashCanIcon } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import emptyImage from '../../assets/img/empty_page.png';
import PageHeader from '../../shared/styles/PageHeader';

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
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)).then(() => {
        Promise.all([
          dispatch(updateProductAmount(targetId)),
          dispatch(
            updateCheckedProductItems(checkedProductList.filter(checkedProductId => checkedProductId !== targetId))
          ),
        ]);
      });
    } else {
      const newContent = {
        productIdList: myShoppingCartProductIds.filter(productId => !checkedProductList.includes(productId)),
      };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)).then(() => {
        Promise.all([
          ...myShoppingCartProductIds.map(productId => dispatch(updateProductAmount(productId))),
          dispatch(updateCheckedProductItems([])),
        ]);
      });
    }
  };

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.PURCHASE)) return;

    const newContent = {
      productIdList: myShoppingCartProductIds.filter(productId => !checkedProductList.includes(productId)),
    };
    const checkedItemList = [...checkedProductList].map(id => ({ id, amount: productAmountDict[id] }));

    dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)).then(() => {
      Promise.all([
        ...checkedProductList.map(productId => dispatch(updateProductAmount(productId))),
        dispatch(updateCheckedProductItems([])),
      ]);
    });

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
                  const isChecked = checkedProductList.includes(productId);
                  const { img, name, price } = productList.find(({ id }) => id === productId);
                  const amount = productAmountDict[productId] || 1;
                  if (!productAmountDict[productId]) {
                    dispatch(updateProductAmount(productId));
                  }

                  return (
                    <ShoppingCartItemContainer key={productId}>
                      <ShoppingCartItem>
                        <CheckBox id={productId} onClick={onClickCheckBox} isChecked={isChecked} />
                        <RowProductItem imgSrc={img} name={name} />
                      </ShoppingCartItem>

                      <ShoppingCartItemOption>
                        <button type="button" onClick={() => onClickDeleteButton(productId)}>
                          <TrashCanIcon />
                        </button>
                        <AmountCounter
                          value={amount}
                          onClickUp={() => onClickAmountCounter(productId, 'up')}
                          onClickDown={() => onClickAmountCounter(productId, 'down')}
                        />
                        <span>{`${numberWithCommas(price * amount)}원`}</span>
                      </ShoppingCartItemOption>
                    </ShoppingCartItemContainer>
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

import { useEffect, useState } from 'react';
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
} from './ShoppingCartPage.styles';
import { ROUTE, AMOUNT_COUNT, CONFIRM_MESSAGE, AMOUNT_COUNTER_FLAG } from '../../constants';
import { updateShoppingCartItemsAsync, updateCheckedProductItems } from '../../redux/action';
import { numberWithCommas } from '../../shared/utils';
import { AmountCounter, CheckBox, Header, PaymentInfoBox, RowProductItem, TrashCanIcon } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';

const ShoppingCartPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { myShoppingCartId, myShoppingCartProductIds } = useSelector(state => ({
    myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
  }));

  const { productList } = useSelector(state => ({
    productList: state.productListReducer.productList,
  }));

  const { checkedProductList } = useSelector(state => ({
    checkedProductList: state.checkedProductReducer.checkedProductList,
  }));

  const [isAllChecked, setAllChecked] = useState(true);
  const [shoppingCartItemList, setShoppingCartItemList] = useState([]);
  const [expectedPrice, setExpectedPrice] = useState(0);

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
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
    } else {
      const newContent = {
        productIdList: myShoppingCartProductIds.filter(productId => !checkedProductList.includes(productId)),
      };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
    }
  };

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.PURCHASE)) return;

    const newContent = {
      productIdList: myShoppingCartProductIds.filter(productId => !checkedProductList.includes(productId)),
    };
    dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: {
        checkedItemList: shoppingCartItemList.filter(({ id }) => checkedProductList.includes(id)),
      },
    });
  };

  const onClickAmountCounter = (productId, flag) => {
    const newState = [...shoppingCartItemList];
    const targetProduct = newState.find(({ id }) => id === productId);

    if (flag === AMOUNT_COUNTER_FLAG.UP) {
      targetProduct.amount += targetProduct.amount < AMOUNT_COUNT.MAX ? 1 : 0;
    } else if (flag === AMOUNT_COUNTER_FLAG.DOWN) {
      targetProduct.amount -= targetProduct.amount > AMOUNT_COUNT.MIN ? 1 : 0;
    }

    setShoppingCartItemList(newState);
  };

  useEffect(() => {
    setShoppingCartItemList(
      productList.filter(({ id }) => myShoppingCartProductIds.includes(id)).map(product => ({ ...product, amount: 1 }))
    );
  }, [productList, myShoppingCartProductIds]);

  useEffect(() => {
    if (!shoppingCartItemList.length) return;

    const newExpectedPrice = checkedProductList.reduce((acc, checkedId) => {
      const { price, amount } = shoppingCartItemList.find(({ id }) => id === checkedId);

      return acc + price * amount;
    }, 0);

    setExpectedPrice(newExpectedPrice);
  }, [checkedProductList, shoppingCartItemList]);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>

      <Container>
        <ShoppingCartContainer>
          <OptionContainer>
            <CheckBox id="all-check" onClick={onClickAllCheckBox} isChecked={isAllChecked} />
            <span>모두선택</span>
            <DeleteButton onClick={() => onClickDeleteButton()} disabled={!checkedProductList.length}>
              상품삭제
            </DeleteButton>
          </OptionContainer>

          <ShoppingCartListTitle>{`장바구니 상품 (${shoppingCartItemList.length}개)`}</ShoppingCartListTitle>

          <ShoppingCartList>
            {shoppingCartItemList.map(({ id, img, name, price, amount }) => {
              const isChecked = checkedProductList.includes(id);

              return (
                <ShoppingCartItemContainer key={id}>
                  <ShoppingCartItem>
                    <CheckBox id={id} onClick={onClickCheckBox} isChecked={isChecked} />
                    <RowProductItem imgSrc={img} name={name} />
                  </ShoppingCartItem>

                  <ShoppingCartItemOption>
                    <button type="button" onClick={() => onClickDeleteButton(id)}>
                      <TrashCanIcon />
                    </button>
                    <AmountCounter
                      value={amount}
                      onClickUp={() => onClickAmountCounter(id, 'up')}
                      onClickDown={() => onClickAmountCounter(id, 'down')}
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
            onClick={onClickPaymentButton}
            isDisable={!checkedProductList.length}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default ShoppingCartPage;

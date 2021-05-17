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
  ShoppingCartItemNotFoundImg,
} from './ShoppingCartPage.styles';
import { ROUTE, AMOUNT_COUNT, SCHEMA, CONFIRM_MESSAGE, AMOUNT_COUNTER_FLAG } from '../../constants';
import { deleteCheckedShoppingCartItemAsync, deleteShoppingCartItemAsync } from '../../redux/action';
import { numberWithCommas } from '../../shared/utils';
import { AmountCounter, CheckBox, Header, PaymentInfoBox, RowProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import useServerAPI from '../../hooks/useServerAPI';
import shoppingCartItemNotFoundImg from '../../shared/assets/img/tung.png';

const TrashCanIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M8.4 10L8.4 17M13.4 10V17M4.88636 4V2.68775C4.88636 2.24685 5.0589 1.82345 5.36706 1.50813C5.68461 1.18318 6.11977 1 6.57412 1H14.9259C15.3802 1 15.8154 1.18318 16.1329 1.50813C16.4411 1.82345 16.6136 2.24685 16.6136 2.68775V4M21.5 4.9H0M2.5 7V18.5451C2.5 19.1593 2.73024 19.7512 3.14527 20.2039C3.61025 20.7112 4.26679 21 4.95493 21H16.5451C17.2332 21 17.8897 20.7112 18.3547 20.2039C18.7698 19.7512 19 19.1593 19 18.5451V7"
      stroke="#BBBBBB"
      strokeWidth="1.8"
    />
  </svg>
);

const ShoppingCartPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);

  const { myShoppingCartProductIds } = useSelector(state => ({
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
  }));

  const [checkedIdList, setCheckedIdList] = useState(myShoppingCartProductIds);
  const [isAllChecked, setAllChecked] = useState(true);
  const [shoppingCartItemList, setShoppingCartItemList] = useState([]);
  const [expectedPrice, setExpectedPrice] = useState(0);

  const onClickAllCheckBox = () => {
    if (isAllChecked) {
      setCheckedIdList([]);
    } else {
      setCheckedIdList(myShoppingCartProductIds);
    }

    setAllChecked(!isAllChecked);
  };

  const onClickCheckBox = event => {
    const { target } = event;

    if (target.checked) {
      setCheckedIdList(prevState => [...prevState, target.id]);
    } else {
      setCheckedIdList(prevState => prevState.filter(productId => productId !== target.id));
    }
  };

  const deleteCheckedShoppingCartItem = () => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    dispatch(deleteCheckedShoppingCartItemAsync(checkedIdList));
  };

  const deleteShoppingCartItem = targetId => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    dispatch(deleteShoppingCartItemAsync(targetId));
  };

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.CHECKOUT)) return;

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: {
        checkedItemList: shoppingCartItemList.filter(({ id }) => checkedIdList.includes(id)),
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
    setCheckedIdList(myShoppingCartProductIds);
  }, [productList, myShoppingCartProductIds]);

  useEffect(() => {
    if (!shoppingCartItemList.length) return;

    setAllChecked(checkedIdList.length === myShoppingCartProductIds.length);

    const newExpectedPrice = checkedIdList.reduce((acc, checkedId) => {
      const { price, amount } = shoppingCartItemList.find(({ id }) => id === checkedId);

      return acc + price * amount;
    }, 0);

    setExpectedPrice(newExpectedPrice);
  }, [checkedIdList, shoppingCartItemList]);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>

      <Container>
        <ShoppingCartContainer>
          <OptionContainer>
            <CheckBox id="all-check" onClick={onClickAllCheckBox} isChecked={isAllChecked} />
            <span>모두선택</span>
            <DeleteButton onClick={deleteCheckedShoppingCartItem} disabled={!checkedIdList.length}>
              상품삭제
            </DeleteButton>
          </OptionContainer>

          <ShoppingCartListTitle>{`장바구니 상품 (${shoppingCartItemList.length}개)`}</ShoppingCartListTitle>

          {myShoppingCartProductIds.length ? (
            <ShoppingCartList>
              {shoppingCartItemList.map(({ id, img, name, price, amount }) => {
                const isChecked = checkedIdList.includes(id);

                return (
                  <ShoppingCartItemContainer key={id}>
                    <ShoppingCartItem>
                      <CheckBox id={id} onClick={onClickCheckBox} isChecked={isChecked} />
                      <RowProductItem imgSrc={img} name={name} />
                    </ShoppingCartItem>

                    <ShoppingCartItemOption>
                      <button type="button" onClick={() => deleteShoppingCartItem(id)}>
                        {TrashCanIcon}
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
          ) : (
            <ShoppingCartItemNotFoundImg alt="shopping-cart-item-not-found" src={shoppingCartItemNotFoundImg} />
          )}
        </ShoppingCartContainer>

        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제예상금액"
            detailText="결제예상금액"
            price={expectedPrice}
            buttonText={`주문하기(${checkedIdList.length}개)`}
            onClick={onClickPaymentButton}
            isDisable={!checkedIdList.length}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default ShoppingCartPage;

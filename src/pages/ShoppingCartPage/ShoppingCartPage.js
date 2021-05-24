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
import { ROUTE, CONFIRM_MESSAGE, AMOUNT_COUNTER_FLAG } from '../../constants';
import { deleteShoppingCartItemAsync, shoppingCartItemSlice } from '../../redux/slice';
import { numberWithCommas } from '../../shared/utils';
import { AmountCounter, CheckBox, Header, PaymentInfoBox, RowProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import shoppingCartItemNotFoundImg from '../../shared/assets/img/tung.png';
import TrashCanIcon from '../../shared/assets/img/trash_can_icon.svg';

const ShoppingCartPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { shoppingCartItemList } = useSelector(state => ({
    shoppingCartItemList: state.myShoppingCartReducer.myShoppingCart,
  }));

  const [checkedItemList, setCheckedItemList] = useState([]);
  const [isAllChecked, setAllChecked] = useState(true);
  const [expectedPrice, setExpectedPrice] = useState(0);

  const onClickAllCheckBox = () => {
    if (isAllChecked) {
      setCheckedItemList([]);
    } else {
      setCheckedItemList(shoppingCartItemList);
    }

    setAllChecked(!isAllChecked);
  };

  const onClickCheckBox = event => {
    const { target } = event;
    const targetItem = shoppingCartItemList.find(({ product_id: productId }) => productId === Number(target.id));

    if (target.checked) {
      setCheckedItemList(prevState => [...prevState, targetItem]);
    } else {
      setCheckedItemList(prevState => prevState.filter(item => item !== targetItem));
    }
  };

  const deleteCheckedShoppingCartItem = () => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    checkedItemList.forEach(({ cart_id: targetCartId }) => dispatch(deleteShoppingCartItemAsync(targetCartId)));
  };

  const deleteShoppingCartItem = targetCartId => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    dispatch(deleteShoppingCartItemAsync(targetCartId));
  };

  const createCheckoutList = () => {
    if (!window.confirm(CONFIRM_MESSAGE.CHECKOUT)) return;

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: { checkedItemList },
    });
  };

  const onClickAmountCounter = (productId, flag) => {
    if (flag === AMOUNT_COUNTER_FLAG.UP) {
      dispatch(shoppingCartItemSlice.actions.increaseAmount(productId));
      return;
    }
    if (flag === AMOUNT_COUNTER_FLAG.DOWN) {
      dispatch(shoppingCartItemSlice.actions.decreaseAmount(productId));
    }
  };

  useEffect(() => {
    setCheckedItemList(shoppingCartItemList);
  }, [shoppingCartItemList]);

  useEffect(() => {
    if (!shoppingCartItemList.length) return;

    setAllChecked(checkedItemList.length === shoppingCartItemList.length);

    const newExpectedPrice = checkedItemList.reduce((acc, checkedItem) => {
      const item = shoppingCartItemList.find(({ product_id: id }) => id === checkedItem.product_id);

      if (item) {
        const { price, amount } = item;

        return acc + price * amount;
      }

      return acc;
    }, 0);

    setExpectedPrice(newExpectedPrice);
  }, [checkedItemList, shoppingCartItemList]);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>

      <Container>
        <ShoppingCartContainer>
          <OptionContainer>
            <CheckBox id="all-check" onClick={onClickAllCheckBox} isChecked={isAllChecked} />
            <span>모두선택</span>
            <DeleteButton onClick={deleteCheckedShoppingCartItem} disabled={!checkedItemList.length}>
              상품삭제
            </DeleteButton>
          </OptionContainer>

          <ShoppingCartListTitle>{`장바구니 상품 (${shoppingCartItemList.length}개)`}</ShoppingCartListTitle>

          {shoppingCartItemList.length ? (
            <ShoppingCartList>
              {shoppingCartItemList.map(shoppingCartItem => {
                const isChecked = checkedItemList.includes(shoppingCartItem);
                const { cart_id: cartId, product_id: id, image_url: img, name, price, amount } = shoppingCartItem;

                return (
                  <ShoppingCartItemContainer key={id}>
                    <ShoppingCartItem>
                      <CheckBox id={id} onClick={onClickCheckBox} isChecked={isChecked} />
                      <RowProductItem imgSrc={img} name={name} />
                    </ShoppingCartItem>

                    <ShoppingCartItemOption>
                      <button type="button" onClick={() => deleteShoppingCartItem(cartId)}>
                        <img src={TrashCanIcon} alt="trash-can-icon" />
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
            buttonText={`주문하기(${checkedItemList.length}개)`}
            onClick={createCheckoutList}
            isDisable={!checkedItemList.length}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default ShoppingCartPage;

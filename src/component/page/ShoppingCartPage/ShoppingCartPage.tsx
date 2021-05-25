import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AMOUNT_COUNTER_FLAG, CONFIRM_MESSAGE, ROUTE } from '../../../constant';
import {
  checkProduct,
  decreaseProductAmount,
  increaseProductAmount,
  removeShoppingCartItemAsync,
  unCheckProduct,
} from '../../../redux/action';
import { RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { CartProductDetailType } from '../../../type';
import Header from '../../atom/Header/Header';
import ShoppingCartLayout from '../../template/ShoppingCartLayout/ShoppingCartLayout';

const ShoppingCartPage = ({ history, location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [isAllChecked, setAllChecked] = useState(false);

  const { shoppingCartProducts } = useSelector(
    ({ myShoppingCartReducer }: RootState) => ({
      shoppingCartProducts: myShoppingCartReducer.products,
    })
  );

  const checkedProductList: Array<CartProductDetailType> = Object.values(
    shoppingCartProducts
  ).filter((product) => product.checked);

  const expectedPrice = Object.values(shoppingCartProducts)
    .filter((product) => product.checked)
    .reduce((acc: number, product: CartProductDetailType) => {
      const { price, quantity } = product;

      return acc + Number(price) * quantity;
    }, 0);

  const onClickAllCheckBox = () => {
    const newAllChecked = !isAllChecked;

    Object.values(shoppingCartProducts).map((product) =>
      newAllChecked
        ? dispatch(checkProduct(product))
        : dispatch(unCheckProduct(product))
    );

    setAllChecked(newAllChecked);
  };

  const onClickCheckBox = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      checkedProductList.push(shoppingCartProducts[target.id]);
      dispatch(checkProduct(shoppingCartProducts[target.id]));
    } else {
      const targetIndex = checkedProductList.findIndex(
        (product) => product.product_id === target.id
      );
      if (!targetIndex) return;
      checkedProductList.splice(targetIndex, 1);
      dispatch(unCheckProduct(shoppingCartProducts[target.id]));
    }
  };

  const onClickDeleteButton = (targetId: string): void => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;
    dispatch(removeShoppingCartItemAsync(shoppingCartProducts[targetId]));
  };

  const onClickDeleteAllButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    return Object.values(shoppingCartProducts).map(
      (product: CartProductDetailType) =>
        dispatch(removeShoppingCartItemAsync(product))
    );
  };

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.PURCHASE)) return;

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: {
        checkedProductList,
      },
    });
  };

  const onClickAmountCounter = (productId: string, flag: string) => {
    if (flag === AMOUNT_COUNTER_FLAG.UP) {
      dispatch(increaseProductAmount(shoppingCartProducts[productId]));
    } else if (flag === AMOUNT_COUNTER_FLAG.DOWN) {
      dispatch(decreaseProductAmount(shoppingCartProducts[productId]));
    }
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>
      <ShoppingCartLayout
        shoppingCartProducts={shoppingCartProducts}
        checkedProductList={checkedProductList}
        onClickCheckBox={onClickCheckBox}
        onClickAmountCounter={onClickAmountCounter}
        onClickAllCheckBox={onClickAllCheckBox}
        isAllChecked={isAllChecked}
        onClickDeleteButton={onClickDeleteButton}
        onClickDeleteAllButton={onClickDeleteAllButton}
        expectedPrice={expectedPrice}
        onClickPaymentButton={onClickPaymentButton}
      />
    </ScreenContainer>
  );
};

export default ShoppingCartPage;

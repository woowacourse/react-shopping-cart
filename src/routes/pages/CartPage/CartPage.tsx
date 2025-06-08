import '../../../App.css';

import Header from '../../../components/@common/Header/Header';
import HeaderButton from '../../../components/@common/Header/HeaderButton';
import ContainerLayout from '../../../components/@common/ContainerLayout/ContainerLayout';
import PageTitle from '../../../components/PageTitle/PageTitle';
import CartItem from '../../../components/ListItem/CartItem/CartItem';
import CartList from '../../../components/List/CartList/CartList';
import CartPriceInfo from '../../../components/PriceInfo/CartPriceInfo/CartPriceInfo';
import OrderButton from '../../../components/OrderButton/OrderButton';
import EmptyCart from '../../../components/EmptyCart/EmptyCart';
import Text from '../../../components/@common/Text/Text';

import { Logo } from '../../../assets';
import { cartPrice } from '../../../utils/cartPrice/cartPrice';
import { CartItemProps } from '../../../types/cartItem';

import useCartList from '../../../hooks/useCartList';
import useSelect from '../../../hooks/useSelect';
import LoadingSpinner from '../../../components/@common/LoadingSpinner/LoadingSpinning';

function CartPage() {
  const {
    cartList,
    isLoading,
    handleIncreaseCartItem,
    handleDecreaseCartItem,
    handleDeleteCartItem,
  } = useCartList();

  const {
    selectedItems,
    isAllSelected,
    handleSelectItem,
    handleSelectAllItems,
  } = useSelect(cartList);

  const selectedCartList = getSelectedCartList(cartList, selectedItems);
  const totalPrice = cartPrice.totalPrice(selectedCartList);

  return (
    <>
      <Header>
        <HeaderButton src={Logo} />
      </Header>
      <ContainerLayout>
        <PageTitle>
          <Text varient="title">장바구니</Text>
          <Text varient="caption">
            현재 {cartList.length}종류의 상품이 담겨있습니다.
          </Text>
        </PageTitle>
        {isLoading && <LoadingSpinner />}
        {!isLoading && cartList.length === 0 && <EmptyCart />}
        {!isLoading && cartList.length > 0 && (
          <>
            <CartList
              isAllSelected={isAllSelected}
              handleSelectedAllItems={handleSelectAllItems}
            >
              {cartList.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  isSelected={selectedItems.has(cartItem.id)}
                  handleSelectItem={handleSelectItem}
                  onIncreaseCartItemClick={handleIncreaseCartItem}
                  onDecreaseCartItemClick={handleDecreaseCartItem}
                  onDeleteCartItemClick={handleDeleteCartItem}
                />
              ))}
            </CartList>
            <CartPriceInfo totalPrice={totalPrice} />
          </>
        )}
      </ContainerLayout>
      <OrderButton
        selectedCartData={selectedCartList}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default CartPage;

function getSelectedCartList(
  cartList: CartItemProps[],
  selectedItems: Set<number>
) {
  return cartList.filter((item) => selectedItems.has(item.id));
}

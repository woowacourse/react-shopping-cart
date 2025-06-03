import '../../../App.css';

import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import PageTitle from '../../../components/PageTitle/PageTitle';
import CartItem from '../../../components/CartItem/CartItem';
import CartList from '../../../components/CartList/CartList';
import CartPriceInfo from '../../../components/CartPriceInfo/CartPriceInfo';
import OrderButton from '../../../components/OrderButton/OrderButton';
import EmptyCart from '../../../components/EmptyCart/EmptyCart';
import Text from '../../../components/common/Text/Text';

import { Logo } from '../../../assets';
import { cartPrice } from '../../../utils/cartPrice/cartPrice';

import useCartList from '../../../hooks/useCartList';
import useSelect from '../../../hooks/useSelect';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinning';

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

  const totalPrice = cartPrice.totalPrice(cartList, selectedItems);

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
        selectedCartData={cartList.filter((item) => selectedItems.has(item.id))}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default CartPage;
